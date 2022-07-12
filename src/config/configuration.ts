export const configuration: any = () => {
    return {
        rabbitmq: {
            user: process.env.RABBIT_MQ_USER,
            password: process.env.RABBIT_MQ_PASSWORD,
            host: process.env.RABBIT_MQ_HOST,
            vhost: process.env.RABBIT_MQ_VHOST,
        },
    };
};
