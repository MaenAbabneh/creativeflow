import Account from "@/database/account.model";
import { handleError } from "@/lib/handler/error";
import { NotFoundError, ValidationError } from "@/lib/http-errors";
import { AccountSchema } from "@/lib/validatoin";
import { APIErrorResponse } from "@/types/global";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { providerAccountId } = await request.json();
  try {
    const validationData = AccountSchema.safeParse({ providerAccountId });
    if (!validationData.success) {
      throw new ValidationError(validationData.error.flatten().fieldErrors);
    }
    const account = await Account.findOne({ providerAccountId });
    if (!account) {
      throw new NotFoundError("account");
    }
    return NextResponse.json(
      {
        success: true,
        data: account,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleError(error, "api") as APIErrorResponse;
  }
}
