"use server";

import bcrypt from "bcryptjs";
import mongoose from "mongoose";

import { signIn } from "@/auth";
import Account from "@/database/account.model";
import User from "@/database/user.model";
import { ActionResponse, ErrorResponse } from "@/types/global";

import action from "../handler/action";
import { handleError } from "../handler/error";
import { NotFoundError } from "../http-errors";
import { SignInSchema, SignUpSchema } from "../validatoin";

export async function singUpWithCredentials(
  params: AuthCredentials
): Promise<ActionResponse> {
  const validatedRusult = await action({ params, schema: SignUpSchema });

  if (validatedRusult instanceof Error) {
    return handleError(validatedRusult) as ErrorResponse;
  }

  const { name, email, username, password } = validatedRusult.params!;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const existingUser = await User.findOne({ email }).session(session);
    if (existingUser) throw new Error("User already exists");
    const existingUsername = await User.findOne({ username }).session(session);
    if (existingUsername) throw new Error("Username already exists");

    const hashedPassword = await bcrypt.hash(password, 12);

    const [newUser] = await User.create(
      [
        {
          name,
          email,
          username,
          password: hashedPassword,
        },
      ],
      { session }
    );

    await Account.create(
      [
        {
          userId: newUser._id,
          name,
          provider: "credentials",
          providerAccountId: email,
          password: hashedPassword,
        },
      ],
      { session }
    );

    await session.commitTransaction();
    try {
      await signIn("credentials", { email, password, redirect: false });
    } catch (signInError) {
      console.log(
        "User created successfully, but auto sign-in failed:",
        signInError
      );
    }

    return { success: true };
  } catch (error) {
    await session.abortTransaction();

    return handleError(error) as ErrorResponse;
  } finally {
    await session.endSession();
  }
}

export async function singInWithCredentials(
  params: Pick<AuthCredentials, "email" | "password">
): Promise<ActionResponse> {
  const validatedRusult = await action({ params, schema: SignInSchema });

  if (validatedRusult instanceof Error) {
    return handleError(validatedRusult) as ErrorResponse;
  }

  const { email, password } = validatedRusult.params!;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) throw new NotFoundError("User");

    const existingAccount = await Account.findOne({
      provider: "credentials",
      providerAccountId: email,
    });
    if (!existingAccount) throw new NotFoundError("Account");

    const passwordMatch = await bcrypt.compare(
      password,
      existingAccount.password!
    );

    if (!passwordMatch) throw new Error("Invalid password");

    await signIn("credentials", { email, password, redirect: false });

    return { success: true };
  } catch (error) {
    return handleError(error) as ErrorResponse;
  }
}

// 1. Validating the input parameters using the SignUpSchema
// 2. Starting a MongoDB session to ensure atomicity
// 3. Checking if the user already exists
// 4. Hashing the password using bcrypt
// 5. Creating a new user and account in the database

// divided problem into smaller parts:
// - Validating the input parameters using Zod schema
// - Starting a MongoDB session to ensure atomicity
// - Checking if the user already exists in the database
// - Hashing the password using bcrypt
// - Creating a new user and account in the database
// - Committing the transaction if everything is successful
// - Handling errors and rolling back the transaction if any error occurs
// - Returning a structured response indicating success or failure
// - Using the signIn function to log in the user after successful registration
// - Ending the session to release resources
