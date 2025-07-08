"use server";

import { ZodError, ZodSchema } from "zod";
import { UnauthorizedError, ValidationError } from "../http-errors";
import { Session } from "next-auth";
import { auth } from "@/auth";
import dbConnect from "../mongoose";

type ActionOption<T> = {
  params?: T;
  schema?: ZodSchema<T>;
  authorize?: boolean;
};

async function action<T>({
  params,
  schema,
  authorize = false,
}: ActionOption<T>) {
  if (params && schema) {
    try {
      schema.parse(params);
    } catch (error) {
      if (error instanceof ZodError) {
        return new ValidationError(
          error.flatten().fieldErrors as Record<string, string[]>
        );
      } else {
        throw new Error("schema validation error");
      }
    }
  }

  let session: Session | null = null;

  if (authorize) {
    session = await auth();
    if (!session) {
      return new UnauthorizedError();
    }
  }

  await dbConnect();
  return {params , session};
}

export default action;

// 1. Checking whether params and schema are provided and validat 
// 2. Checking whether the user is authorized if the authorize flag is set to true
// 3. Connecting to the database
// 4. Returning the validated params and session if authorization is successful

// divided problem into smaller parts:
// - Validating the input parameters using Zod schema
// - Checking if the user is authorized using NextAuth
// - Connecting to the database using a utility function
// - Returning the validated parameters and session if authorization is successful
// - Handling errors appropriately using custom error classes
// - Returning a structured response with params and session