import { Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Logger } from 'winston';
import { GenericResponse } from '../types/returnTypes';
import { AppLogger } from '../helpers/CustomLogger';
import { GenericErrorTypes } from '../messages/errors/ErrorTypes';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    constructor(private readonly logger: Logger) {}

    catch(exception: unknown): GenericResponse {
        const { message = '' } = exception as Error;

        AppLogger.logError(this.logger, {
            type: GenericErrorTypes.GenericError,
            message,
        });

        return {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message,
        };
    }
}
