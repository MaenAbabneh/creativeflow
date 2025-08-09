import z from "zod";

import { InteractionActionEnums } from "@/constants";

export const SignInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const SignUpSchema = z.object({
  email: z.string().email("Invalid email address"),

  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .min(8, "Password must be at least 8 characters long")

    .refine((val) => /[A-Z]/.test(val), {
      message: "Password must contain at least one uppercase letter",
    })

    .refine((val) => /[a-z]/.test(val), {
      message: "Password must contain at least one lowercase letter",
    })

    .refine((val) => /[0-9]/.test(val), {
      message: "Password must contain at least one number letter",
    })

    .refine((val) => /[^a-zA-Z0-9]/.test(val), {
      message: "Password must contain at least one sympole letter",
    }),

  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(30, "Username must be less than 20 characters long")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    ),

  name: z
    .string()
    .min(3, "Name must be at least 3 characters long")
    .max(50, "Name must be less than 50 characters long")
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces"),
});

export const QuestionSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters long")
    .max(100, "Title must be less than 100 characters long"),
  content: z.string().min(20, "Content must be at least 20 characters long"),
  tags: z
    .array(z.string().max(30, "Tag must be less than 30 characters"))
    .min(1, "At least one tag is required")
    .max(5, "A maximum of 5 tags is allowed"),
});

export const UserSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(50, "Name must be less than 50 characters"),
  username: z.string().min(3, "Username must be at least 3 characters long"),
  email: z.string().email("Invalid email address"),
  bio: z.string().max(500, "Bio must be less than 500 characters").optional(),
  image: z.string().url("Invalid image URL").optional(),
  location: z
    .string()
    .max(100, "Location must be less than 100 characters")
    .optional(),
  portfolio: z.string().url("Invalid portfolio URL").optional(),
  reputation: z.number().optional(),
});

export const AccountSchema = z.object({
  userId: z.string().min(1, { message: "User ID is required" }),
  name: z.string().min(1, { message: "Name is required" }),
  password: z
    .string()
    .min(8, { message: "Password must contain at least 8 characters" })
    .max(100, { message: "Password must be less than 100 characters" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least one special character",
    })
    .optional(),
  image: z.string().url({ message: "Invalid image URL" }).optional(),
  provider: z.string().min(1, { message: "Provider is required" }),
  providerAccountId: z
    .string()
    .min(1, { message: "Provider Account ID is required" }),
});

export const SigninWithOauthSchema = z.object({
  provider: z.enum(["google", "github"]),
  providerAccountId: z
    .string()
    .min(1, { message: "Provider Account ID is required" }),
  user: z.object({
    name: z.string().min(1, { message: "Name is required" }),
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters long" }),
    email: z.string().email({ message: "Invalid email address" }),
    image: z.string().url({ message: "Invalid image URL" }).optional(),
  }),
});

export const EditQuestionSchema = QuestionSchema.extend({
  questionId: z.string().min(1, { message: "Question ID is required." }),
});

export const GetQuestionSchema = QuestionSchema.extend({
  questionId: z.string().min(1, { message: "Question ID is required." }),
});

export const GetQuestionsSchema = z.object({
  questionId: z.string().min(1, { message: "Question ID is required." }),
});

export const PaginatedSearchSchema = z.object({
  page: z.number().int().positive().default(1),
  pageSize: z.number().int().positive().default(10),
  query: z.string().optional(),
  filter: z.string().optional(),
  sort: z.string().optional(),
});

export const GetTagQuestionsSchema = PaginatedSearchSchema.extend({
  tagId: z.string().min(1, { message: "Tag ID is required." }),
});

export const IncrementViewsSchema = z.object({
  questionId: z.string().min(1, "Question ID is required"),
});

export const AnswerSchema = z.object({
  content: z.string().min(20, "Content must be at least 20 characters long"),
});

export const AnswerServerSchema = AnswerSchema.extend({
  questionId: z.string().min(1, "Question ID is required"),
});

export const GetAnswersSchema = PaginatedSearchSchema.extend({
  questionId: z.string().min(1, "Question ID is required"),
});

export const EditAnswerSchema = AnswerSchema.extend({
  answerId: z.string().min(1, "Answer ID is required"),
  questionId: z.string().min(1, "Question ID is required"),
  content: z.string().min(20, "Content must be at least 20 characters long"),
});

export const AIAnswerSchema = z.object({
  question: z
    .string()
    .min(5, { message: "Question is required." })
    .max(130, { message: "Question cannot exceed 130 characters." }),
  content: z
    .string()
    .min(100, { message: "Answer has to have more than 100 characters." }),
  userAnswer: z.string().min(20, {
    message: "User answer must be at least 20 characters long.",
  }),
});

export const CreateVotesSchema = z.object({
  targetId: z.string().min(1, { message: "Target ID is required." }),
  targetType: z.enum(["question", "answer"], {
    message: "Target type is required.",
  }),
  voteType: z.enum(["upvote", "downvote"], {
    message: "Vote type is required.",
  }),
});

export const UpdateVotesSchema = CreateVotesSchema.extend({
  change: z.number().int().min(-1).max(1),
});

export const HasVotedSchema = CreateVotesSchema.pick({
  targetId: true,
  targetType: true,
});

export const HasSavedSchema = z.object({
  targetId: z.string().min(1, { message: "Target ID is required." }),
  targetType: z.enum(["question", "answer"], {
    message: "Target type is required.",
  }),
});

export const CreateAddCollectionSchema = z.object({
  questionId: z.string().min(1, { message: "Question ID is required." }),
});

export const getUserDetailsSchema = z.object({
  userId: z.string().min(1, { message: "User ID is required." }),
});

export const getUserInfoSchema = z.object({
  userId: z.string().min(1, { message: "User ID is required." }),
  page: z.number().int().positive().default(1),
  pageSize: z.number().int().positive().default(10),
});

export const deleteQuestionSchema = z.object({
  questionId: z.string().min(1, { message: "Question ID is required." }),
});

export const deleteAnswerSchema = z.object({
  answerId: z.string().min(1, { message: "Answer ID is required." }),
});

export const createInteractionSchema = z.object({
  actionId: z.string().min(1),
  authorId: z.string().min(1),
  actionTarget: z.enum(["answer", "question"]),
  actions: z.enum(InteractionActionEnums),
});

export const ProfileSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Name must be at least 3 characters.",
    })
    .max(130, { message: "Name musn't be longer then 130 characters." }),
  username: z
    .string()
    .min(3, { message: "username musn't be longer then 100 characters." }),
  portfolio: z.string().url({ message: "Please provide valid URL" }),
  location: z.string().min(3, { message: "Please provide proper location" }),
  bio: z.string().min(3, {
    message: "Bio must be at least 3 characters.",
  }),
});

export const UpdateUserSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Name must be at least 3 characters.",
    })
    .max(130, { message: "Name musn't be longer then 130 characters." }),
  username: z
    .string()
    .min(3, { message: "username musn't be longer then 100 characters." }),
  portfolio: z.string().url({ message: "Please provide valid URL" }),
  location: z.string().min(3, { message: "Please provide proper location" }),
  bio: z.string().min(3, {
    message: "Bio must be at least 3 characters.",
  }),
});

export const GlobalSearchSchema = z.object({
  query: z.string(),
  type: z.string().nullable().optional(),
});