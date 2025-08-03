"use server";

import { ActionResponse, ErrorResponse } from "@/types/global";
import action from "../handler/action";
import { handleError } from "../handler/error";
import {
  CreateVotesSchema,
  HasVotedSchema,
  UpdateVotesSchema,
} from "../validatoin";
import mongoose, { ClientSession } from "mongoose";
import Vote from "@/database/vote.model";
import Answer from "@/database/answer .model";
import Question from "@/database/question.model";
import { revalidatePath } from "next/cache";
import ROUTES from "@/constants/routes";
import { after } from "next/server";
import { createInteraction } from "./interaction.action";

export async function updateVotes(
  params: updateVotesParams,
  session?: ClientSession
): Promise<ActionResponse> {
  const validationResult = await action({
    params,
    schema: UpdateVotesSchema,
  });
  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }
  const { voteType, targetId, targetType, change } = validationResult.params!;

  const Model = targetType === "question" ? Question : Answer;
  const voteField = voteType === "upvote" ? "upvotes" : "downvotes";

  try {
    const result = await Model.findByIdAndUpdate(
      targetId,
      { $inc: { [voteField]: change } },
      { new: true, session }
    );

    if (!result)
      return handleError(
        new Error("Failed to update vote count")
      ) as ErrorResponse;

    return { success: true };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function createVotes(
  params: createVotesParams
): Promise<ActionResponse> {
  const validationResult = await action({
    params,
    schema: CreateVotesSchema,
    authorize: true,
  });
  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }
  const { voteType, targetId, targetType } = validationResult.params!;

  const userId = validationResult.session?.user?.id;
  if (!userId) return handleError("User not authenticated") as ErrorResponse;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const Model = targetType === "question" ? Question : Answer;

    const contentDoc = await Model.findById(targetId).session(session);
    if (!contentDoc) throw new Error("Content not found");

    const contentAuthorId = contentDoc.author.toString();

    const existingVote = await Vote.findOne({
      author: userId,
      actionId: targetId,
      actionType: targetType,
    }).session(session);

    if (existingVote) {
      if (existingVote.voteType === voteType) {
        // If the user has already voted with the same voteType, remove the vote
        await Vote.deleteOne({ _id: existingVote._id }).session(session);
        
        await updateVotes(
          { targetId, targetType, voteType, change: -1 },
          session
        );
      } else {
        // If the user has already voted with a different voteType, update the vote
        await Vote.findByIdAndUpdate(
          existingVote._id,
          { voteType },
          { new: true, session }
        );
        await updateVotes(
          { targetId, targetType, voteType: existingVote.voteType, change: -1 },
          session
        );
        await updateVotes(
          { targetId, targetType, voteType, change: 1 },
          session
        );
      }
    } else {
      // If the user has not voted yet, create a new vote
      await Vote.create(
        [
          {
            author: userId,
            actionId: targetId,
            actionType: targetType,
            voteType,
          },
        ],
        {
          session,
        }
      );
      await updateVotes({ targetId, targetType, voteType, change: 1 }, session);
    }

    await session.commitTransaction();
    session.endSession();

    revalidatePath(ROUTES.QUESTION(targetId));

    after(async () => {
      await createInteraction({
        actionId: targetId,
        authorId: contentAuthorId,
        actionTarget: targetType,
        actions: voteType,
      });
    });

    return { success: true };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return handleError(error) as ErrorResponse;
  }
}

export async function hasVoted(
  params: HasVotedParams
): Promise<ActionResponse<HasVotedResponse>> {
  const validationResult = await action({
    params,
    schema: HasVotedSchema,
    authorize: true,
  });
  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { targetId, targetType } = validationResult.params!;
  const userId = validationResult.session?.user?.id;

  if (!userId) return handleError("User not authenticated") as ErrorResponse;

  try {
    const vote = await Vote.findOne({
      author: userId,
      actionId: targetId,
      actionType: targetType,
    });
    if (!vote) {
      return {
        success: false,
        data: { hasUpvoted: false, hasDownvoted: false },
      };
    }

    return {
      success: true,
      data: {
        hasUpvoted: vote.voteType === "upvote",
        hasDownvoted: vote.voteType === "downvote",
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}
