# Builder
FROM node:16-alpine AS builder

WORKDIR /usr/backend

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

# Runner
FROM node:16-alpine AS runner

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/backend

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile --production

COPY . .

COPY --from=builder /usr/backend/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main"]
