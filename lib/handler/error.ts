import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { RequestError, ValidationError } from "../http-errors";
import logger from "../logger";

export type ResponseTypes = "api" | "server";

const formatResponse = (
  responseType: ResponseTypes,
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
  return responseType === "api"
    ? NextResponse.json(responseContent, { status })
    : { ...responseContent, status };
};
export const handleError = (
  error: unknown,
  responseType: ResponseTypes = "server"
) => {
  logger.error("An error occurred", error);
  if (error instanceof RequestError) {
    logger.error(
      { err: error },
      `${responseType.toUpperCase()} Error: ${error.message}`
    );
    return formatResponse(
      responseType,
      error.statusCode,
      error.message,
      error.error
    );
  }
  if (error instanceof ZodError) {
    const validationError = new ValidationError(
      error.flatten().fieldErrors as Record<string, string[]>
    );
    logger.error(
      { err: error },
      `${responseType.toUpperCase()} Validation Error: ${validationError.message}`
    );
    return formatResponse(
      responseType,
      validationError.statusCode,
      validationError.message,
      validationError.error
    );
  }
  if (error instanceof Error) {
    logger.error({ err: error }, "An unexpected error occurred");
    return formatResponse(responseType, 500, error.message);
  }
  return formatResponse(responseType, 500, "An unexpected error occurred");
};
