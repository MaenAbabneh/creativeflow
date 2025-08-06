"use server";


import mongoose from "mongoose";

import Interaction, { IInteractionDoc } from "@/database/interaction.model";
import User from "@/database/user.model";
import { ActionResponse, ErrorResponse } from "@/types/global";

import action from "../handler/action";
import { handleError } from "../handler/error";
import { createInteractionSchema } from "../validatoin";

export async function createInteraction(
  params: createInteractionParams
): Promise<ActionResponse<IInteractionDoc>> {
  const validationResult = await action({
    params,
    schema: createInteractionSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { actions, actionId, actionTarget, authorId } =
    validationResult.params!;
  const userId = validationResult.session?.user?.id;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const [interaction] = await Interaction.create(
      [
        {
          actions,
          actionId,
          actionTarget,
          authorId,
        },
      ],
      { session }
    );

    // TODO: Update reputation for both the performer and the content author

    await updateReputation({
      interaction,
      session,
      performerId: userId!,
      authorId,
    });

    await session.commitTransaction();
    return {
      success: true,
      data: JSON.parse(JSON.stringify(interaction)),
    };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return handleError(error) as ErrorResponse;
  } finally {
    session.endSession();
  }
}

export async function updateReputation(params: UpdateReputationParams) {
  const { interaction, session, performerId, authorId } = params;

  const { actions, actionType } = interaction;

  let performerPoint = 0;
  let authorPoint = 0;

  switch (actions) {
    case "upvote":
      performerPoint = 2;
      authorPoint = 10;
      break;
    case "downvote":
      performerPoint = -1;
      authorPoint = -2;
      break;
    case "bookmark":
      performerPoint = 2;
      authorPoint = 5;
      break;
    case "post":
      authorPoint = actionType === "question" ? 5 : 10;
      break;
    case "delete":
      authorPoint = actionType === "question" ? -5 : -10;
      break;
    case "edit":
      authorPoint = actionType === "question" ? 2 : 2;
      break;
    case "search":
      performerPoint = 1;
      authorPoint = 0;
      break;
    case "view":
      performerPoint = 0;
      authorPoint = 1;
      break;     
  }

  if (performerId === authorId) {
    await User.findByIdAndUpdate(
      performerId,
      { $inc: { reputation: performerPoint } },
      { session }
    );
    return;
  }

  await User.bulkWrite(
    [
      {
        updateOne: {
          filter: { _id: performerId },
          update: { $inc: { reputation: performerPoint } },
        },
      },
      {
        updateOne: {
          filter: { _id: authorId },
          update: { $inc: { reputation: authorPoint } },
        },
      },
    ],
    { session }
  );
}
