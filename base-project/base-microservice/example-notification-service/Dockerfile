# Dependencies
FROM node:16-alpine AS deps

WORKDIR /usr/backend

COPY package.json yarn.lock ./prod/
COPY package.json yarn.lock ./dev/

WORKDIR /usr/backend/dev
RUN yarn install --frozen-lockfile

WORKDIR /usr/backend/prod
RUN yarn install --frozen-lockfile --production

# Builder
FROM node:16-alpine AS builder

WORKDIR /usr/backend

COPY --from=deps /usr/backend/dev/node_modules ./node_modules
COPY . .

RUN yarn build

# Runner
FROM node:16-alpine AS runner

WORKDIR /usr/backend

COPY --from=deps /usr/backend/prod/node_modules  ./node_modules
COPY --from=builder /usr/backend/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main"]
