import { GraphQLError } from "graphql";

class GraphQLErrorCodes {
  protected codes = {
    SyntaxError: " GRAPHQL_PARSE_FAILED",
    ValidationError: "GRAPHQL_VALIDATION_FAILED",
    UserInputError: "BAD_USER_INPUT",
    AuthenticationError: "UNAUTHENTICATED",
    ForbiddenError: "FORBIDDEN",
    PersistedQueryNotFoundError: "PERSISTED_QUERY_NOT_FOUND",
    PersistedQueryNotSupportedError: "PERSISTED_QUERY_NOT_SUPPORTED",
    InternalServerError: "INTERNAL_SERVER_ERROR",
  };
}

export class AppError extends GraphQLErrorCodes {
  private message: string;
  private statusCode: number;
  constructor(message: string, statusCode: number) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }

  private error(errorCode: string) {
    throw new GraphQLError(this.message, {
      extensions: {
        code: errorCode,
        http: { status: this.statusCode },
      },
    });
  }

  badUserInput() {
    const errorCode: string = this.codes.UserInputError;
    this.error(errorCode);
  }

  unAuthenticated() {
    const errorCode: string = this.codes.AuthenticationError;
    this.error(errorCode);
  }

  forbidden() {
    const errorCode: string = this.codes.ForbiddenError;
    this.error(errorCode);
  }

  serverError() {
    const errorCode: string = this.codes.InternalServerError;
    this.error(errorCode);
  }
}
