import { Provider } from "@radix-ui/react-tooltip";
import z from "zod";

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
    .array(z.string())
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
  userId: z.string().min(1, {message:"User ID is required"}),
  name: z.string().min(1, {message:"Name is required"}),
  password: z
    .string()
    .min(8, {message:"Password must conain at least 8 characters"})
    .max(100, {message:"Password must be less than 100 characters"})
    .regex(/[A-Z]/, {message:"Password must contain at least one uppercase letter"})
    .regex(/[a-z]/, {message:"Password must contain at least one lowercase letter"})
    .regex(/[0-9]/, {message:"Password must contain at least one number"})
    .regex(/[^a-zA-Z0-9]/, {message:"Password must contain at least one special character"})
    .optional(),
  image: z.string().url({message:"Invalid image URL"}).optional(),
  provider: z.string().min(1, {message:"Provider is required"}),
  providerAccountId: z.string().min(1, {message:"Provider Account ID is required"}),
});

export const SigninWithOauthSchema = z.object({
  provider: z.enum(["google", "github"]),
  providerAccountId: z.string().min(1, { message: "Provider Account ID is required" }),
  user : z.object({
  name: z.string().min(1, { message: "Name is required" }),
  username: z.string().min(3, { message: "Username must be at least 3 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  image: z.string().url({ message: "Invalid image URL" }).optional(),
  }),
});