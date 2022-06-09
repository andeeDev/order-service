## Order service

App responsible for creating orders and storing the products.
Docker-compose.yml file set up all containers 

## Running the app

To set up the app create env file 
```dotenv
DATABASE_URL= # mongo atlas url

RABBIT_MQ_USER=andee
RABBIT_MQ_PASSWORD=guest
RABBIT_MQ_HOST=rabbitmq
RABBIT_MQ_VHOST=notifications
```
Then start the containers

```bash
 docker-compose up -d
```

