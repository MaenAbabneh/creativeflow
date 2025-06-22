import { handleError } from "@/lib/handler/error";
import { NotFoundError, ValidationError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { APIErrorResponse } from "@/types/global";
import User from "@/database/user.model";
import { NextResponse } from "next/server";
import { UserSchema } from "@/lib/validatoin";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) throw new NotFoundError("User");
  try {
    await dbConnect();

    const user = await User.findById(id);
    if (!user) throw new NotFoundError("User");

    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) throw new NotFoundError("User");
  try {
    await dbConnect();

    const user = await User.findByIdAndDelete(id);
    if (!user) throw new NotFoundError("User");
    return NextResponse.json(
      { success: true, message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!id) throw new NotFoundError("User");
  try {
    await dbConnect();
    const body = await request.json();

    const ValidatedData = UserSchema.partial().parse(body);

    const updatedUser = await User.findByIdAndUpdate(id, ValidatedData, {
      new: true,
    });

    if (!updatedUser) throw new NotFoundError("User");

    return NextResponse.json({ success: true, data: updatedUser }, { status: 200 });
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
