import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { INestMicroservice } from '@nestjs/common';
import { AppModule } from './app.module';
import { configuration } from './config/configuration';

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

    await app.listen();
}

/* eslint-disable unicorn/prefer-top-level-await */
bootstrap();
