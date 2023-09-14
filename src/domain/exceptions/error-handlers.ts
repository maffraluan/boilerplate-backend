export class ErrorHandler extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class ResponseOrError extends Error {
  private _statusCode: number;
  private _message: string;

  constructor(message: string, statusCode = 500) {
    super(message);
    this._statusCode = statusCode;
    this._message = message;
  }

  get message() {
    return this._message;
  }

  get statusCode() {
    return this._statusCode;
  }
}
