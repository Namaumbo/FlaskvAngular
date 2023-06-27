
class AppError extends Error {
  constructor(message, statusCode, name, code , description) {
    super(message);
    this.statusCode = 404;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.name = name;
    this.code = code;
    this.description = description
    Error.captureStackTrace(this, this.constructor);
  }
}

class BadRequestError extends AppError {
  constructor(message) {
    super(
      message || "Bad Request",
      402,
      "BadRequestError",
      "BAD_REQUEST"
    );
  }
}

class UnprocessedEntities extends AppError {
  constructor(message , description) {
    super(
      message || "Bad Request",
      404,
      "wrong username or password",
      "UNPROCESSED_ENTITIES"
    );
    this.description = description | 'entities not processed'
  }
}

class NotFoundError extends AppError {
  constructor(message) {
    super(
      message || "entity not found",
      404,
      "NotFoundError",
      "NOT_FOUND"
    );
    this.statusCode = 404
  }
}

class NotAuthorizedError extends AppError {
  constructor(message, description)  {
    super(
      message || "Not Authorized",
      "NotAuthorized",
      "NOT_AUTHORIZED"
    );
    this.statusCode = 401
    this.description = description | 'Token missing please login'
  }
}

module.exports = {
  NotAuthorizedError,
  BadRequestError,
  NotFoundError,
  AppError,
  UnprocessedEntities,
};