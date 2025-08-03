"use server";

import {
  ActionResponse,
  ErrorResponse,
  Questions,
  Users,
  Answers,
  Badges,
} from "@/types/global";
import {
  getUserDetailsSchema,
  getUserInfoSchema,
  PaginatedSearchSchema,
} from "../validatoin";
import action from "../handler/action";
import { handleError } from "../handler/error";
import { FilterQuery, PipelineStage, Types } from "mongoose";
import { Answer, Question, User } from "@/database";
import { assignBadges } from "../utils";
import { cache } from "react";

export async function getAllUsers(
  params: PaginatedSearchParams
): Promise<ActionResponse<{ users: Users[]; isNext: boolean }>> {
  const validationResult = await action({
    params,
    schema: PaginatedSearchSchema,
  });
  if (validationResult instanceof Error) {
    return handleError(validationResult.error) as ErrorResponse;
  }
  const {
    page = 1,
    pageSize = 10,
    query = "",
    filter = "",
    sort = "",
  } = params!;

  const skip = (Number(page) - 1) * pageSize;
  const limit = pageSize;

  const filterQuery: FilterQuery<typeof User> = {};

  if (query) {
    filterQuery.$or = [
      { name: { $regex: query, $options: "i" } },
      { email: { $regex: query, $options: "i" } },
    ];
  }

  let sortCriteria = {};

  switch (filter) {
    case "newest":
      sortCriteria = { createdAt: -1 };
      break;
    case "oldest":
      sortCriteria = { createdAt: 1 };
      break;
    case "popular":
      sortCriteria = { reputation: -1 };
      break;
    default:
      sortCriteria = { createdAt: -1 };
      break;
  }

  try {
    const totalUsers = await User.countDocuments(filterQuery);

    const users = await User.find(filterQuery)
      .sort(sortCriteria)
      .skip(skip)
      .limit(limit);

    const isNext = totalUsers > skip + users.length;

    return {
      success: true,
      data: {
        users: JSON.parse(JSON.stringify(users)),
        isNext,
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}
export const getUserDetails = cache(async function getUserDetails(params: getUserDetails): Promise<
  ActionResponse<{
    user: Users;
  }>
> {
  const validationResult = await action({
    params,
    schema: getUserDetailsSchema,
  });
  if (validationResult instanceof Error) {
    return handleError(validationResult.error) as ErrorResponse;
  }

  const { userId } = params;

  try {
    const user = await User.findById(userId);

    if (!user) throw new Error("User not found");

    return {
      success: true,
      data: {
        user: JSON.parse(JSON.stringify(user)),
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}
)

export async function getUserQuestions(
  params: getUserInfo
): Promise<ActionResponse<{ questions: Questions[]; isNext: boolean }>> {
  const validationResult = await action({
    params,
    schema: getUserInfoSchema,
  });
  if (validationResult instanceof Error) {
    return handleError(validationResult.error) as ErrorResponse;
  }

  const { userId, page = 1, pageSize = 10 } = params;
  const skip = (Number(page) - 1) * pageSize;
  const limit = pageSize;

  try {
    const totalQuestions = await Question.countDocuments({ userId: userId });

    const question = await Question.find({ author: userId })
      .populate("tags", "name")
      .populate("author", "name image")
      .skip(skip)
      .limit(limit);
    if (!question) throw new Error("question not found");

    const isNext = totalQuestions > skip + question.length;

    return {
      success: true,
      data: {
        questions: JSON.parse(JSON.stringify(question)),
        isNext,
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function getUserAnswers(
  params: getUserInfo
): Promise<ActionResponse<{ answers: Answers[]; isNext: boolean }>> {
  const validationResult = await action({
    params,
    schema: getUserInfoSchema,
  });
  if (validationResult instanceof Error) {
    return handleError(validationResult.error) as ErrorResponse;
  }

  const { userId, page = 1, pageSize = 10 } = params;
  const skip = (Number(page) - 1) * pageSize;
  const limit = pageSize;

  try {
    const totalAnswers = await Answer.countDocuments({ author: userId });

    const answers = await Answer.find({ author: userId })
      .populate("author", "_id name image")
      .limit(limit)
      .skip(skip);

    const isNext = totalAnswers > skip + answers.length;

    return {
      success: true,
      data: {
        answers: JSON.parse(JSON.stringify(answers)),
        isNext,
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function getUserTopTags(
  params: getUserDetails
): Promise<
  ActionResponse<{ tags: { _id: string; name: string; count: number }[] }>
> {
  const validationResult = await action({
    params,
    schema: getUserDetailsSchema,
  });
  if (validationResult instanceof Error) {
    return handleError(validationResult.error) as ErrorResponse;
  }

  const { userId } = params;

  try {
    const pipeline: PipelineStage[] = [
      {
        $match: {
          author: new Types.ObjectId(userId),
        },
      },
      { $unwind: "$tags" },
      {
        $group: {
          _id: "$tags",
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "tags",
          localField: "_id",
          foreignField: "_id",
          as: "tagInfo",
        },
      },
      {
        $unwind: "$tagInfo",
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: 10,
      },
      {
        $project: {
          _id: "$tagInfo._id",
          name: "$tagInfo.name",
          count: 1,
        },
      },
    ];

    const tags = await Question.aggregate(pipeline);

    return {
      success: true,
      data: {
        tags: JSON.parse(JSON.stringify(tags)),
      },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function getUserStats(
  params: getUserDetails
): Promise<
  ActionResponse<{
    totalQuestions: number;
    totalAnswers: number;
    badges: Badges;
  }>
> {
  const validationResult = await action({
    params,
    schema: getUserDetailsSchema,
  });
  if (validationResult instanceof Error) {
    return handleError(validationResult.error) as ErrorResponse;
  }

  const { userId } = params;

  try {
    const [questionStats] = await Question.aggregate([
      { $match: { author: new Types.ObjectId(userId) } },
      {
        $group: {
          _id: null,
          count: { $sum: 1 },
          upvotes: { $sum: "$upvotes" },
          views: { $sum: "$views" },
        },
      },
    ]);

    const [answerStates] = await Answer.aggregate([
      { $match: { author: new Types.ObjectId(userId) } },
      {
        $group: {
          _id: null,
          count: { $sum: 1 },
          upvotes: { $sum: "$upvotes" },
        },
      },
    ]);

    const badges = assignBadges({
      criteria: [
        { type: "QUESTION_COUNT", count: questionStats?.count || 0 },
        { type: "ANSWER_COUNT", count: answerStates?.count || 0 },
        { type: "QUESTION_UPVOTES", count: questionStats?.upvotes + answerStates?.upvotes || 0 },
        { type: "TOTAL_VIEWS" , count: questionStats?.views || 0 },
      ]
    });



    return {
      success: true,
      data: {
        badges,
        totalQuestions: questionStats?.count || 0,
        totalAnswers: answerStates?.count || 0,},
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}
