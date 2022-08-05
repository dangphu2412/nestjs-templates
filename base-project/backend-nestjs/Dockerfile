# Builder
FROM node:16-alpine AS builder

WORKDIR /usr/backend

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

# Builder
FROM node:16-alpine AS prod

WORKDIR /usr/backend

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile --production

# Runner
FROM node:16-alpine AS runner

WORKDIR /usr/backend

COPY --from=prod /usr/backend/node_modules  ./node_modules
COPY --from=builder /usr/backend/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main"]
