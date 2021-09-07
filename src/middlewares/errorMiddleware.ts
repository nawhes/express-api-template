import { Request, Response, NextFunction } from 'express';
import BaseError from '../app/Errors/BaseError';
import ErrorParser from '../app/Errors/ErrorParser';

const sendErrorResponse = (error: any, response: Response) => response
  .status(error.code)
  .send(error.toPlainObject());

const parseErrorAndSendResponse = (error: any, response: Response) => {
  const parsedError = ErrorParser.parse(error);
  return sendErrorResponse(parsedError, response);
};

const isErrorProperlyFormatted = (error: any) => error instanceof BaseError;

const middleware = (error: any, _request: Request, response: Response, next: NextFunction) => {
  if (!error) {
    return next();
  }

  if (isErrorProperlyFormatted(error)) {
    return sendErrorResponse(error, response);
  }

  return parseErrorAndSendResponse(error, response);
};

export default middleware;