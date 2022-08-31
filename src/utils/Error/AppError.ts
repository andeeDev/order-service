import { RpcException } from '@nestjs/microservices';

export class AppError extends RpcException {
    constructor(code: number, message: string) {
        super({ code, message });
    }
}
