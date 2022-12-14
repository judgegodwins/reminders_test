import { Response } from 'express';
// import { PaginationResult } from '../utils';
// import { PaginationResult } from '../helpers/Pagination';

enum StatusCode {
  SUCCESS = '10000',
  FAILURE = '10001',
  RETRY = '10002',
  INVALID_ACCESS_TOKEN = '10003'
}

enum ResponseStatus {
  SUCCESS = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  VALIDATION_ERROR = 422,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_ERROR = 500,
  NOT_ALLOWED = 405,
}

abstract class ApiResponse {
  constructor(    
    protected success: boolean,
    protected status: ResponseStatus,
    protected message: string
  ) {}

  protected prepare<T extends ApiResponse>(res: Response, response: T): Response {
    return res.status(this.status).json(ApiResponse.sanitize(response));
  }

  public send(res: Response): Response {
    return this.prepare<ApiResponse>(res, this);
  }

  private static sanitize<T extends ApiResponse>(response: T): T {
    const clone: T = {} as T;

    Object.assign(clone, response);

    //@ts-ignore
    delete clone.status;

    for (const i in clone) {
      if (typeof clone[i] === 'undefined') delete clone[i];
    }
    return clone;
  }
}

export class SuccessMsgResponse extends ApiResponse {
  constructor(message: string) {
    super(true, ResponseStatus.SUCCESS, message)
  }
}

export class FailureMsgResponse extends ApiResponse {
  constructor(message: string) {
    super(false, ResponseStatus.SUCCESS, message);
  }
}

export class SuccessResponse<T> extends ApiResponse {
  constructor(message: string, private data: T) {
    super(true, ResponseStatus.SUCCESS, message);
  }

  send(res: Response): Response {
    return super.prepare<SuccessResponse<T>>(res, this);
  }
}

export class CreatedResponse<T> extends ApiResponse {
  constructor(message: string, private data: T) {
    super(true, ResponseStatus.CREATED, message);
  }

  send(res: Response): Response {
    return super.prepare<CreatedResponse<T>>(res, this);
  }
}

// export class PaginationResponse<T> extends ApiResponse {
//   private data: PaginationResult<T>["data"];
//   private pageData: PaginationResult<T>["pageData"];

//   constructor(message: string, result: PaginationResult<T>) {
//     super(true, ResponseStatus.SUCCESS, message);
//     this.data = result.data;
//     this.pageData = result.pageData;
//   }
// }

export class NotFoundResponse extends ApiResponse {
  private url: string | undefined;

  constructor(message = 'Not Found') {
    super(false, ResponseStatus.NOT_FOUND, message);
  }

  send(res: Response): Response {
    this.url = res.req?.originalUrl;
    return this.prepare<NotFoundResponse>(res, this);
  }
}

export class AuthFailureResponse extends ApiResponse {
  constructor(message = 'Authentication Failure') {
    super(false, ResponseStatus.UNAUTHORIZED, message);
  }
}

export class NotAllowedResponse extends ApiResponse {
  constructor(message = 'Method not allowed') {
    super(false, ResponseStatus.NOT_ALLOWED, message);
  }
}

export class ForbiddenResponse extends ApiResponse {
  constructor(message = 'Forbidden') {
    super(false, ResponseStatus.FORBIDDEN, message);
  }
}

export class BadRequestResponse extends ApiResponse {
  constructor(message = 'Bad Parameters') {
    super(false, ResponseStatus.BAD_REQUEST, message);
  }
}

export class ValidationErrorResponse extends ApiResponse {
  errors: string[];
  constructor(message = 'Invalid Input', errors: string[]) {
    super(false, ResponseStatus.VALIDATION_ERROR, message);
    this.errors = errors;
  }
}

export class InternalErrorResponse extends ApiResponse {
  constructor(message = 'Internal Error') {
    super(false, ResponseStatus.INTERNAL_ERROR, message);
  }
}

export class AccessTokenErrorResponse extends ApiResponse {
  private instruction = 'refresh_token';

  constructor(message = 'Access token invalid') {
    super(false, ResponseStatus.UNAUTHORIZED, message);
  }

  send(res: Response): Response {
    res.setHeader('instruction', this.instruction);
    return super.prepare<AccessTokenErrorResponse>(res, this);
  }
}

export class TokenRefreshResponse extends ApiResponse {
  constructor(message: string, private accessToken: string, private refreshToken: string) {
    super(true, ResponseStatus.SUCCESS, message);
  }

  send(res: Response): Response {
    return super.prepare<TokenRefreshResponse>(res, this);
  }
}
