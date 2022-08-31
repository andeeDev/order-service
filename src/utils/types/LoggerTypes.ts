import { SuccessType } from '../messages/success/SuccessTypes';
import { ErrorType } from '../messages/errors/ErrorTypes';

export type SuccessLoggerTypes = {
    type: SuccessType;
};

export type ErrorLoggerTypes = {
    type: ErrorType;
    message: string;
};

export interface LogInfoMessage {
    type: SuccessLoggerTypes;
}
