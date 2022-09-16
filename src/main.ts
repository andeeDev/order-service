import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { INestMicroservice } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AppModule } from './app.module';
import { configuration } from './config/configuration';
import { AllExceptionsFilter } from './utils/filters/AllExceptionFilter';

async function bootstrap(): Promise<void> {
    const { user, host, password, vhost } = configuration().rabbitmq;

    const rabbitMqConnectionString: string = `amqp://${user}:${password}@${host}/${vhost}`;

    const app: INestMicroservice = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
        transport: Transport.RMQ,
        options: {
            urls: [rabbitMqConnectionString],
            queueOptions: {
                durable: true,
                messageTtl: 10_000,
            },
            queue: 'order-service',
            noAck: true,
            prefetchCount: 1,
        },
    });

    app.useGlobalFilters(new AllExceptionsFilter(app.get(WINSTON_MODULE_NEST_PROVIDER)));

    await app.listen();
}

/* eslint-disable unicorn/prefer-top-level-await */
bootstrap();
