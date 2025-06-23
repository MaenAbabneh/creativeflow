import Account from "@/database/account.model";
import { handleError } from "@/lib/handler/error";
import { ForbiddenError, NotFoundError, ValidationError } from "@/lib/http-errors";
import dbConnect from "@/lib/mongoose";
import { AccountSchema } from "@/lib/validatoin";
import { APIErrorResponse } from "@/types/global";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    const accounts = await Account.find();
    if (!accounts) throw new NotFoundError("Account");

    return NextResponse.json(
      { success: true, data: accounts },
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
    const validatedData = AccountSchema.parse(body);
    
    const existingAccount = await Account.findOne({
      provider: validatedData.userId,
      providerAccountId: validatedData.providerAccountId,
    });

    if (existingAccount) throw new ForbiddenError("An account with this provider and account ID already exists");
    
    const newAccount = await Account.create(validatedData);
    return NextResponse.json(
      { success: true, data: newAccount },
      { status: 201 }
    );

  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
