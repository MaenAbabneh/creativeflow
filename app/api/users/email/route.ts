import { handleError } from "@/lib/handler/error";
import { UserSchema } from "@/lib/validatoin";
import { APIErrorResponse } from "@/types/global";
import User from "@/database/user.model";
import { NotFoundError, ValidationError } from "@/lib/http-errors";
import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";

export async function POST(request: Request) {
  const { email } = await request.json();

  try {
    await dbConnect();

    const validatedEmail = UserSchema.partial().safeParse({ email });
    
    if (!validatedEmail.success)
      throw new ValidationError(validatedEmail.error.flatten().fieldErrors);

    const user = await User.findOne({ email });
    if (!user) throw new NotFoundError("User");

    return NextResponse.json(
      {
        success: true,
        data: user,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
