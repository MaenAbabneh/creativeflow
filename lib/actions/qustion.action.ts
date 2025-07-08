"use server";

import { ActionResponse, ErrorResponse, Questions } from "@/types/global";
import action from "../handler/action";
import { QuestionSchema } from "../validatoin";
import { handleError } from "../handler/error";
import mongoose from "mongoose";
import Question from "@/database/question.model";
import Tag from "@/database/tags.model";
import TagQuestion from "@/database/questionTag.model";

interface createQuestionProps {
  title: string;
  content: string;
  tags: string[];
}

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

  const { title, content, tags } = validationResult.params!;
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
