import { NextResponse } from "next/server";

import User from "@/database/user.model";
import { handleError } from "@/lib/handler/error";
import { ValidationError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { UserSchema } from "@/lib/validatoin";
import { APIErrorResponse } from "@/types/global";

export async function GET() {
  try {
    await dbConnect();

    const users = await User.find();

    return NextResponse.json(
      {
        success: true,
        data: users,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();

    const body = await request.json();

    const ValidatedData = UserSchema.safeParse(body);

    if (!ValidatedData.success) {
      throw new ValidationError(ValidatedData.error.flatten().fieldErrors);
    }

    const { email, username } = ValidatedData.data;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("email already exists");
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      throw new Error("username already exists");
    }

    const newUser = await User.create(ValidatedData.data);
    return NextResponse.json(
      {
        success: true,
        data: newUser,
      },
      { status: 201 }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
