import { HttpStatus } from '@nestjs/common';
import { GenericResponse } from './returnTypes';

export const genericSuccessResponse: GenericResponse = {
    status: HttpStatus.OK,
    message: '',
};
