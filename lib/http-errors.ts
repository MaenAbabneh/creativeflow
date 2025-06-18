export class RequestError extends Error{
    statusCode: number;
    error?:Record<string, string[]>;
    constructor(statusCode: number, message: string, error?: Record<string, string[]>) {
        super(message);
        this.statusCode = statusCode;
        this.error = error;
        this.name = "RequestError";
    }
}

export class ValidationError extends RequestError{
    constructor(fieledErrors: Record<string, string[]>) {
        const message = ValidationError.formatMessage(fieledErrors);
        super(400, message, fieledErrors);
        this.name = "ValidationError";
        this.error = fieledErrors;
    }
    static formatMessage(fieledErrors: Record<string, string[]>): string{
        return Object.entries(fieledErrors).map(([field, errors]) => {
            return `${field}: ${errors.join(", ")}`;
        }).join(". ");
    }
}

export class NotFoundError extends RequestError{
    constructor(resource: string) {
        super(404, `${resource} not found`);
        this.name = "NotFoundError";
    }
}

export class ForbiddenError extends RequestError{
    constructor(massage: string = "Forbidden") {
        super(403, massage);
        this.name = "ForbiddenError";
    }
}

export class UnauthorizedError extends RequestError{
    constructor(message: string = "Unauthorized") {
        super(401, message);
        this.name = "UnauthorizedError";
    }
}

