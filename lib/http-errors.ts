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
    constructor(fieldErrors: Record<string, string[]>) {
        const message = ValidationError.formatMessage(fieldErrors);
        super(400, message, fieldErrors);
        this.name = "ValidationError";
        this.error = fieldErrors;
    }
    static formatMessage(fieldErrors: Record<string, string[]>): string{
        return Object.entries(fieldErrors).map(([field, errors]) => {
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
    constructor(message: string = "Forbidden") {
        super(403, message);
        this.name = "ForbiddenError";
    }
}

export class UnauthorizedError extends RequestError{
    constructor(message: string = "Unauthorized") {
        super(401, message);
        this.name = "UnauthorizedError";
    }
}

