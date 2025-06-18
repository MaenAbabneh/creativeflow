import { NextResponse } from "next/server";
import { RequestError, ValidationError } from "../http-errors";
import { ZodError } from "zod";

export type ResponseTypes = "api" | "server";

const formatResponse = (
  type: ResponseTypes,
  status: number,
  message: string,
  error?: Record<string, string[]>
) => {
  const responseContent = {
    success: false,
    error: {
      message,
      details: error,
    },
  };
  return type === "api"
    ? NextResponse.json(responseContent, { status })
    : { ...responseContent, status };
};
export const handleError = (error: unknown, type: ResponseTypes = "server") => {
  if (error instanceof RequestError) {
    return formatResponse(type, error.statusCode, error.message, error.error);
  }
  if (error instanceof ZodError) {
    const validationError = new ValidationError(
      error.flatten().fieldErrors as Record<string, string[]>
    );
    return formatResponse(
      type,
      validationError.statusCode,
      validationError.message,
      validationError.error
    );
  }
  if (error instanceof Error) {
    return formatResponse(type, 500, error.message);
  }
  return formatResponse(type, 500, "An unexpected error occurred");
};
