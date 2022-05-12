FROM node:18.1.0-alpine3.14 AS build

WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . ./

# Create prisma types
RUN npx prisma generate

# build js & remove devDependencies from node_modules
RUN npm run build && npm prune --production


FROM node:18.1.0-alpine3.14

ENV PORT=3000
ENV NODE_ENV=production
WORKDIR /app

COPY --from=build /app/dist /app/dist
COPY --from=build /app/node_modules /app/node_modules


EXPOSE 3000
ENTRYPOINT [ "node" ]
CMD [ "dist/main.js" ]