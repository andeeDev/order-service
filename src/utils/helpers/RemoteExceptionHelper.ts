import { RpcException } from '@nestjs/microservices';
import { Logger } from 'winston';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { HttpStatus } from '@nestjs/common';
import { CommonMessages } from '../messages/CommonMessages';
import { AppLogger } from './CustomLogger';
import { AppError } from '../Error/AppError';
import { ErrorType } from '../messages/errors/ErrorTypes';

interface IRemoteExceptionHelper {
    handleRemoteError: (logger: Logger, error: unknown) => never;
}

export const RemoteExceptionHelper: IRemoteExceptionHelper = {
    handleRemoteError(logger: Logger, error: unknown): never {
        if (error instanceof HttpException) {
            logger.error(error.message);
            throw new RpcException({
                message: error.message,
                code: error.getStatus(),
            });
        }
        if (error instanceof Error) {
            logger.error(error.message);
            throw new RpcException({
                message: error.message,
                code: 500,
            });
        }
        logger.error(error);
        throw new RpcException(CommonMessages.InternalServerError);
    },
};

export const ExceptionHandler: any = {
    handleError(error: unknown, type: ErrorType): never {
        const { message = '' } = error as Error;

        AppLogger.logError(this.logger, {
            type,
            message,
        });
        throw new AppError(HttpStatus.INTERNAL_SERVER_ERROR, message);
    },
};
