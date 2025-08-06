"use server";

import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import { after } from "next/server";

import ROUTES from "@/constants/routes";
import Answer, { IAnswerDoc } from "@/database/answer .model";
import Question from "@/database/question.model";
import Vote from "@/database/vote.model";
import { ActionResponse, Answers,ErrorResponse } from "@/types/global";

import action from "../handler/action";
import { handleError } from "../handler/error";
import {
  AnswerServerSchema,
  deleteAnswerSchema,
  GetAnswersSchema,
} from "../validatoin";
import { createInteraction } from "./interaction.action";

export async function createAnswer(
  params: createAnswerParmas
): Promise<ActionResponse<IAnswerDoc>> {
  const validationResult = await action({
    params,
    schema: AnswerServerSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { content, questionId } = validationResult.params!;
  const userId = validationResult.session?.user?.id;

  if (!userId) {
    return handleError(new Error("User not authenticated")) as ErrorResponse;
  }
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const question = await Question.findById(questionId);
    if (!question) throw new Error("Question not found");

    const [newAnswer] = await Answer.create(
      [
        {
          author: userId,
          content,
          question: questionId,
        },
      ],
      { session }
    );

    if (!newAnswer) throw new Error("Failed to create answer");

    question.answers += 1;

    await question.save({ session });
    await session.commitTransaction();

    revalidatePath(ROUTES.QUESTION(questionId));

    after(async () => {
      await createInteraction({
        actionId: newAnswer._id.toString(),
        authorId: userId as string,
        actionTarget: "answer",
        actions: "post",
      });
    });

    return { success: true, data: JSON.parse(JSON.stringify(newAnswer)) };
  } catch (error) {
    if (session.inTransaction()) {
      await session.abortTransaction();
    }
    return handleError(error) as ErrorResponse;
  } finally {
    await session.endSession();
  }
}

export async function getAnswers(
  params: getAnswersParams
): Promise<
  ActionResponse<{ answers: Answers[]; isNext: boolean; totalAnswers: number }>
> {
  const validationResult = await action({
    params,
    schema: GetAnswersSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const {
    questionId,
    page = 1,
    pageSize = 10,
    filter,
  } = validationResult.params!;
  const skip = (page - 1) * pageSize;
  const limit = pageSize;

  let sortCriteria = {};

  switch (filter) {
    case "latest":
      sortCriteria = { createdAt: -1 };
      break;
    case "oldest":
      sortCriteria = { createdAt: 1 };
      break;
    case "popular":
      sortCriteria = { upvotes: -1 };
      break;
    default:
      sortCriteria = { createdAt: -1 };
      break;
  }

  try {
    const totalAnswers = await Answer.countDocuments({ question: questionId });
    const answers = await Answer.find({ question: questionId })
      .populate("author", "_id name image")
      .sort(sortCriteria)
      .skip(skip)
      .limit(limit);

    const isNext = totalAnswers > skip + limit;
    return {
      success: true,
      data: {
        answers: JSON.parse(JSON.stringify(answers)),
        isNext,
        totalAnswers,
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function deleteAnswer(params: deleteAnswerParams) {
  const validationResult = await action({
    params,
    schema: deleteAnswerSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { answerId } = validationResult.params!;
  const { user } = validationResult.session!;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const answer = await Answer.findById(answerId).session(session);
    if (!answer) throw new Error("Answer not found");

    if (answer.author.toString() !== user?.id)
      throw new Error("User not authorized to delete this answer");

    await Question.findByIdAndUpdate(
      answer.question,
      { $inc: { answers: -1 } },
      { new: true, session }
    );

    await Vote.deleteMany({ actionId: answerId, actionType: "answer" }).session(
      session
    );

    await Answer.findByIdAndDelete(answerId).session(session);

    await session.commitTransaction();
    session.endSession();

    revalidatePath(`/profile/${user?.id}`);

    after(async () => {
      await createInteraction({
        actionId: answerId,
        authorId: user?.id as string,
        actionTarget: "answer",
        actions: "delete",
      });
    });

    return { success: true };
  } catch (error) {
    if (session.inTransaction()) {
      await session.abortTransaction();
    }
    return handleError(error) as ErrorResponse;
  } finally {
    await session.endSession();
  }
}
