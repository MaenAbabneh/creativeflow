import { NextResponse } from "next/server";
import { RequestError, ValidationError } from "../http-errors";
import { ZodError } from "zod";
import logger from "../logger";

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
    logger.error("An error occurred", error);
  if (error instanceof RequestError) {
    logger.error({err: error}, `${type.toUpperCase()} Error: ${error.message}`);
    return formatResponse(type, error.statusCode, error.message, error.error);
  }
  if (error instanceof ZodError) {
    const validationError = new ValidationError(

      error.flatten().fieldErrors as Record<string, string[]>
    );
    logger.error({err: error}, `${type.toUpperCase()} Validation Error: ${validationError.message}`);
    return formatResponse(
      type,
      validationError.statusCode,
      validationError.message,
      validationError.error
    );
  }
  if (error instanceof Error) {
    logger.error({err: error}, "An unexpected error occurred");
    return formatResponse(type, 500, error.message);
  }
  return formatResponse(type, 500, "An unexpected error occurred");
};
