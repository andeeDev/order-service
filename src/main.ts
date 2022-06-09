import { NestFactory } from '@nestjs/core';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
    const app: INestApplication = await NestFactory.create(AppModule);
    const config: ConfigService = app.get<ConfigService>(ConfigService);

    const user: string = config.get('rabbitmq.user');
    const password: string = config.get('rabbitmq.password');
    const host: string = config.get('rabbitmq.host');
    const vhost: string = config.get('rabbitmq.vhost');
    const rabbitMqConnectionString: string = `amqp://${user}:${password}@${host}/${vhost}`;

    app.connectMicroservice({
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
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
        }),
    );

    await app.startAllMicroservices();
}

bootstrap();
