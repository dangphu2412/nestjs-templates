# Builder
FROM node:16-alpine AS builder

WORKDIR /usr/backend

COPY ["package.json", "yarn.lock", "./"]
COPY . .

RUN yarn install --frozen-lockfile && yarn build

WORKDIR /usr/backend/prod

COPY ["package.json", "yarn.lock", "./"]

RUN yarn install --frozen-lockfile --production

# Runner
FROM node:16-alpine AS runner

WORKDIR /usr/backend

COPY .env ./.env
COPY --from=builder /usr/backend/prod/node_modules  ./node_modules
COPY --from=builder /usr/backend/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main"]
