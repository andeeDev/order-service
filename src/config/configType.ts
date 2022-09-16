export interface ConfigType {
    rabbitmq: {
        user: string;
        password: string;
        host: string;
        vhost: string;
    };
}

export type ConfigurationType = () => ConfigType;
