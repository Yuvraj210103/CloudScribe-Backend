import CustomAPIError, { ErrorCode } from "./custom.error";

class UnAuthenticatedError extends CustomAPIError {
  statusCode: number;
  constructor(message: string, errorCode: ErrorCode) {
    super(message, errorCode, 404, null);
    this.statusCode = 401;
  }
}

export default UnAuthenticatedError;
