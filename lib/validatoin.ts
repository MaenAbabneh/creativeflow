import z from "zod";

export const SignInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const SignUpSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .max(50, "Email must be less than 50 characters")
    .email("Invalid email address"),

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
