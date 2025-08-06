"use server";

import mongoose, { FilterQuery, Types } from "mongoose";
import { revalidatePath } from "next/cache";
import { after } from "next/server";
import { cache } from "react";

import { auth } from "@/auth";
import Answer from "@/database/answer .model";
import Collection from "@/database/collection .model";
import Interaction from "@/database/interaction.model";
import Question, { IQuestionDoc } from "@/database/question.model";
import TagQuestion from "@/database/questionTag.model";
import Tag, { ITagDoc } from "@/database/tags.model";
import Vote from "@/database/vote.model";
import { ActionResponse, ErrorResponse, Questions } from "@/types/global";

import action from "../handler/action";
import { handleError } from "../handler/error";
import dbConnect from "../mongoose";
import {
  deleteQuestionSchema,
  EditQuestionSchema,
  GetQuestionsSchema,
  IncrementViewsSchema,
  PaginatedSearchSchema,
  QuestionSchema,
} from "../validatoin";
import { createInteraction } from "./interaction.action";

export async function createQuestion(
  params: createQuestionProps
): Promise<ActionResponse<Questions>> {
  const validationResult = await action({
    params,
    schema: QuestionSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { title, content, tags ,  } = validationResult.params!;
  const userId = validationResult.session?.user?.id;

  if (!userId) {
    return handleError(new Error("User not authenticated")) as ErrorResponse;
  }
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
  
    const [question] = await Question.create(
      [
        {
          title,
          content,
          author: userId,
        },
      ],
      { session }
    );
    if (!question) throw new Error("Failed to create question");
    const tagIds: mongoose.Types.ObjectId[] = [];
    const tagsQustionsDoc = [];

    for (const tag of tags) {
      const existingTag = await Tag.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        { $setOnInsert: { name: tag }, $inc: { questions: 1 } },
        { upsert: true, new: true, session }
      );
      tagIds.push(existingTag._id);

      tagsQustionsDoc.push({
        tag: existingTag._id,
        question: question._id,
      });
    }

    await TagQuestion.insertMany(tagsQustionsDoc, { session });

    await Question.findByIdAndUpdate(
      question._id,
      { $push: { tags: { $each: tagIds } } },
      { session }
    );

    after(async () => {
      await createInteraction({
        actionId: question._id.toString(),
        authorId: userId as string,
        actionTarget: "question",
        actions: "post",
      });
    });

    await session.commitTransaction();
    return {
      success: true,
      data: JSON.parse(JSON.stringify(question)),
      statusCode: 201,
    };
  } catch (error) {
    if (session.inTransaction()) {
      await session.abortTransaction();
    }
    return handleError(error) as ErrorResponse;
  } finally {
    await session.endSession();
  }
}

export async function editQuestion(
  params: updateQuestionProps
): Promise<ActionResponse<IQuestionDoc>> {
  const validationResult = await action({
    params,
    schema: EditQuestionSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { title, content, tags, questionId } = validationResult.params!;
  const userId = validationResult.session?.user?.id;

  if (!userId) {
    return handleError(new Error("User not authenticated")) as ErrorResponse;
  }
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const question = await Question.findById(questionId).populate("tags");

    if (!question) throw new Error("Question not found");

    if (question.author.toString() !== userId)
      throw new Error("You are not authorized to edit this question");

    if (question.title !== title || question.content !== content) {
      question.title = title;
      question.content = content;
      await question.save({ session });
    }
    const tagstoadd = tags.filter(
      (tag) =>
        !question.tags.some(
          (existingTag: ITagDoc) =>
            existingTag.name.toLowerCase() === tag.toLowerCase()
        )
    );

    const tagsToRemove = question.tags.filter(
      (tag: ITagDoc) =>
        !tags.some(
          (deleteTag: string) =>
            deleteTag.toLowerCase() === tag.name.toLowerCase()
        )
    );

    const newTagDocuments = [];

    if (tagstoadd.length > 0) {
      for (const tag of tagstoadd) {
        const existingTag = await Tag.findOneAndUpdate(
          { name: { $regex: `^${tag}$`, $options: "i" } },
          { $setOnInsert: { name: tag }, $inc: { questions: 1 } },
          { upsert: true, new: true, session }
        );
        newTagDocuments.push({
          tag: existingTag._id,
          question: question._id,
        });
        question.tags.push(existingTag._id);
      }
    }

    if (tagsToRemove.length > 0) {
      const tagIdsToRemove = tagsToRemove.map((tag: ITagDoc) => tag._id);

      await Tag.updateMany(
        { _id: { $in: tagIdsToRemove } },
        { $inc: { questions: -1 } },
        { session }
      );

      await TagQuestion.deleteMany(
        { tag: { $in: tagIdsToRemove }, question: questionId },
        { session }
      );

      question.tags = question.tags.filter(
        (tag: mongoose.Types.ObjectId) =>
          !tagsToRemove.some((removeId: mongoose.Types.ObjectId) =>
            removeId.equals(tag)
          )
      );
    }
    if (newTagDocuments.length > 0) {
      await TagQuestion.insertMany(newTagDocuments, { session });
    }

    await question.save({ session });

    after(async () => {
      await createInteraction({
        actionId: question._id.toString(),
        authorId: userId as string,
        actionTarget: "question",
        actions: "edit",
      });
    });
    await session.commitTransaction();

    return { success: true, data: JSON.parse(JSON.stringify(question)) };
  } catch (error) {
    await session.abortTransaction();
    return handleError(error) as ErrorResponse;
  } finally {
    await session.endSession();
  }
}

export async function getRecommendedQuestions({
  userId,
  query,
  skip,
  limit,
}: RecommendationParams) {
  // Get user's recent interactions
  const interactions = await Interaction.find({
    user: new Types.ObjectId(userId),
    actionType: "question",
    actions: { $in: ["view", "upvote", "bookmark", "post"] },
  })
    .sort({ createdAt: -1 })
    .limit(50)
    .lean();

  const interactedQuestionIds = interactions.map((i) => i.actionId);

  // Get tags from interacted questions
  const interactedQuestions = await Question.find({
    _id: { $in: interactedQuestionIds },
  }).select("tags");

  // Get unique tags
  const allTags = interactedQuestions.flatMap((q) =>
    q.tags.map((tag: Types.ObjectId) => tag.toString())
  );

  // Remove duplicates
  const uniqueTagIds = [...new Set(allTags)];

  const recommendedQuery: FilterQuery<typeof Question> = {
    // exclude interacted questions
    _id: { $nin: interactedQuestionIds },
    // exclude the user's own questions
    author: { $ne: new Types.ObjectId(userId) },
    // include questions with any of the unique tags
    tags: { $in: uniqueTagIds.map((id) => new Types.ObjectId(id)) },
  };

  if (query) {
    recommendedQuery.$or = [
      { title: { $regex: query, $options: "i" } },
      { content: { $regex: query, $options: "i" } },
    ];
  }

  const total = await Question.countDocuments(recommendedQuery);

  const questions = await Question.find(recommendedQuery)
    .populate("tags", "name")
    .populate("author", "name image")
    .sort({ upvotes: -1, views: -1 }) // prioritizing engagement
    .skip(skip)
    .limit(limit)
    .lean();

  return {
    questions: JSON.parse(JSON.stringify(questions)),
    isNext: total > skip + questions.length,
  };
}

export const getQuestion = cache(async function getQuestion(
  params: GetQuestionsParams
): Promise<ActionResponse<Questions>> {
  const validationResult = await action({
    params,
    schema: GetQuestionsSchema,
    authorize: true,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { questionId } = validationResult.params!;

  try {
    const question = await Question.findById(questionId)
      .populate("tags")
      .populate("author", "name image");

    if (!question) throw new Error("Question not found");

    return { success: true, data: JSON.parse(JSON.stringify(question)) };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}
)

export async function getQuestions(
  params: PaginatedSearchParams
): Promise<ActionResponse<{ questions: Questions[]; isNext: boolean }>> {
  const validationResult = await action({
    params,
    schema: PaginatedSearchSchema,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { page = 1, pageSize = 10, query, filter } = validationResult.params!;
  const skip = (page - 1) * pageSize;
  const limit = Number(pageSize);
  
  const filterQuery: FilterQuery<typeof Question> = {};

  let sortCriteria = {};

try {
  if (filter === "recommended") {
     const session = await auth();
      const userId = session?.user?.id;

      if (!userId) {
        return { success: true, data: { questions: [], isNext: false } };
      }

      const recommended = await getRecommendedQuestions({
        userId,
        query,
        skip,
        limit,
      });

      return { success: true, data: recommended };
  }

  if (query) {
    filterQuery.$or = [
      { title: { $regex: new RegExp(query, "i") } },
      { content: { $regex: new RegExp(query, "i") } },
    ];
  }


  switch (filter) {
    case "newest":
      sortCriteria = { createdAt: -1 };
      break;
    case "unanswered":
      filterQuery.answers = 0;
      sortCriteria = { createdAt: -1 };
      break;
    case "popular":
      sortCriteria = { upvotes: -1 };
      break;
    case "most_viewed":
      sortCriteria = { views: -1 };
      break;
    default:
      sortCriteria = { createdAt: -1 };
      break;
  }

  
    const totalQuestions = await Question.countDocuments(filterQuery);

    const questions = await Question.find(filterQuery)
      .populate("tags", "name")
      .populate("author", "name image")
      .lean()
      .sort(sortCriteria)
      .skip(skip)
      .limit(limit);

    const isNext = totalQuestions > skip + questions.length;

    return {
      success: true,
      data: { questions: JSON.parse(JSON.stringify(questions)), isNext },
    };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function incrementViews(
  params: IncrementViewsParams
): Promise<ActionResponse<{ views: number }>> {
  const validationResult = await action({
    params,
    schema: IncrementViewsSchema,
  });

  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { questionId } = validationResult.params!;

  try {
    const question = await Question.findByIdAndUpdate(
      questionId,
      { $inc: { views: 1 } },
      { new: true }
    );
    if (!question) throw new Error("Question not found");

    after(async () => {
      await createInteraction({
        actionId: question._id.toString(),
        authorId: question.author.toString(),
        actionTarget: "question",
        actions: "view",
      });
    });

    return { success: true, data: { views: question.views } };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function getPopularQuestions(): Promise<
  ActionResponse<Questions[]>
> {
  try {
    await dbConnect();

    const questions = await Question.find({})
      .sort({ upvotes: -1, views: -1 })
      .limit(5);

    return { success: true, data: JSON.parse(JSON.stringify(questions)) };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

export async function deleteQuestion(
  params: deleteQuestionParams
): Promise<ActionResponse> {
  const validationResult = await action({
    params,
    schema: deleteQuestionSchema,
    authorize: true,
  });
  if (validationResult instanceof Error) {
    return handleError(validationResult) as ErrorResponse;
  }

  const { questionId } = params;
  const { user } = validationResult.session!;

  const session = await mongoose.startSession();

  try {
     session.startTransaction();

    // البحث عن السؤال للتأكد من وجوده
    const question = await Question.findById(questionId).session(session);
    if (!question) throw new Error("Question not found");

    // التحقق من صلاحيات المستخدم
    if (question.author.toString() !== user?.id) {
      throw new Error("You are not authorized to delete this question");
    }

    // حذف المجموعات المرتبطة بالسؤال
    await Collection.deleteMany({ question: questionId }).session(session);

    // حذف علاقات العلامات بالسؤال
    await TagQuestion.deleteMany({ question: questionId }).session(session);

    // تقليل عدد الأسئلة في العلامات
    if (question.tags.length > 0) {
      await Tag.updateMany(
        { _id: { $in: question.tags } },
        { $inc: { questions: -1 } },
        { session }
      );
    }

    // البحث عن الإجابات المرتبطة بالسؤال
    const answers = await Answer.find({ question: questionId }).session(
      session
    );

    // حذف الإجابات والأصوات المرتبطة بها
    if (answers.length > 0) {
      await Answer.deleteMany({ question: questionId }).session(session);

      // حذف أصوات الإجابات
      await Vote.deleteMany(
        {
          actionId: { $in: answers.map((answer) => answer._id) },
          actionType: "answer",
        },
        { session }
      );
    }

    // حذف الأصوات المرتبطة بالسؤال نفسه
    await Vote.deleteMany(
      {
        actionId: questionId,
        actionType: "question",
      },
      { session }
    );

    // حذف السؤال نفسه
    await Question.findByIdAndDelete(questionId).session(session);

    // إتمام المعاملة
    await session.commitTransaction();

    // إعادة تحديث المسار
    revalidatePath(`/profile/${user?.id}`);

    after(async () => {
      await createInteraction({
        actionId: question._id.toString(),
        authorId: user?.id as string,
        actionTarget: "question",
        actions: "delete",
      });
    });

    return {
      success: true,
    };
  } catch (error) {
    // إلغاء المعاملة في حالة الخطأ
    if (session.inTransaction()) {
      await session.abortTransaction();
    }
    return handleError(error) as ErrorResponse;
  } finally {
    // إنهاء الجلسة
    await session.endSession();
  }
}
