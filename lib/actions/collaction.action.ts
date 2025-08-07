"use server";

import mongoose, { PipelineStage } from "mongoose";
import { revalidatePath } from "next/cache";
import { after } from "next/server";

import ROUTES from "@/constants/routes";
import Collection from "@/database/collection .model";
import Question from "@/database/question.model";
import { ActionResponse, Collections, ErrorResponse } from "@/types/global";

import action from "../handler/action";
import { handleError } from "../handler/error";
import {
  CreateAddCollectionSchema,
  PaginatedSearchSchema,
} from "../validatoin";
import { createInteraction } from "./interaction.action";

export async function addToCollection(
  params: CreateAddCollectionParams
): Promise<ActionResponse<{ hasSaved: boolean }>> {
  const validationResult = await action({
    params,
    schema: CreateAddCollectionSchema,
    authorize: true,
  });
  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { questionId } = validationResult.params!;
  const userId = validationResult.session?.user?.id;

  if (!userId) return handleError("User not authenticated") as ErrorResponse;

  try {
    const question = await Question.findById(questionId);
    if (!question) return handleError("Question not found") as ErrorResponse;

    const collection = await Collection.findOne({
      author: userId,
      question: questionId,
    });
    if (collection) {
      await Collection.findByIdAndDelete(collection._id);
      revalidatePath(ROUTES.QUESTION(questionId));
      return { success: true, data: { hasSaved: false } };
    }
    await Collection.create({
      question: questionId,
      author: userId,
    });

    revalidatePath(ROUTES.QUESTION(questionId));

    after(async () => {
      await createInteraction({
        actionId: question._id.toString(),
        authorId: userId,
        actionTarget: "question",
        actions: "bookmark",
      });
    });

    return { success: true, data: { hasSaved: true } };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function hasSavedQuestion(
  params: CreateAddCollectionParams
): Promise<ActionResponse<{ saved: boolean }>> {
  const validationResult = await action({
    params,
    schema: CreateAddCollectionSchema,
    authorize: false, // Don't require authentication
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { questionId } = validationResult.params!;
  const userId = validationResult.session?.user?.id;

  try {
    const collection = await Collection.findOne({
      question: questionId,
      author: userId,
    });

    return {
      success: true,
      data: {
        saved: !!collection,
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function getSavedQuestions(
  params: PaginatedSearchParams
): Promise<ActionResponse<{ Collection: Collections[]; isNext: boolean }>> {
  const validationResult = await action({
    params,
    schema: PaginatedSearchSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }
  const userId = validationResult.session?.user?.id;
  if (!userId) return handleError("User not authenticated") as ErrorResponse;
  const { page = 1, pageSize = 10, filter, query } = validationResult.params!;

  const limit = pageSize;
  const skip = (Number(page) - 1) * pageSize;

  const sortOption: Record<string, Record<string, 1 | -1>> = {
    mostrecent: { "question.createdAt": -1 },
    oldest: { "question.createdAt": 1 },
    mostvoted: { "question.upvotes": -1 },
    mostviewed: { "question.views": -1 },
    mostanswered: { "question.answers": -1 },
  };

  const sortCriteria = sortOption[filter as keyof typeof sortOption] || {
    "question.createdAt": -1,
  };

  try {
    const pipeline: PipelineStage[] = [
      { $match: { author: new mongoose.Types.ObjectId(userId) } },
      {
        $lookup: {
          from: "questions",
          localField: "question",
          foreignField: "_id",
          as: "question",
        },
      },
      { $unwind: "$question" },
      {
        $lookup: {
          from: "users",
          localField: "question.author",
          foreignField: "_id",
          as: "question.author",
        },
      },
      { $unwind: "$question.author" },
      {
        $lookup: {
          from: "tags",
          localField: "question.tags",
          foreignField: "_id",
          as: "question.tags",
        },
      },
    ];

    if (query) {
      pipeline.push({
        $match: {
          $or: [
            { "question.title": { $regex: query, $options: "i" } },
            { "question.content": { $regex: query, $options: "i" } },
          ],
        },
      });
    }
    const [totalcount] = await Collection.aggregate([
      ...pipeline,
      { $count: "count" },
    ]);

    pipeline.push({ $sort: sortCriteria }, { $skip: skip }, { $limit: limit });
    pipeline.push({$project: {question: 1, author: 1}});

    const questions = await Collection.aggregate(pipeline);

    const isNext = totalcount?.count > skip + questions.length;

    return { success: true, data: { Collection: JSON.parse(JSON.stringify(questions)), isNext } };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}
