# Builder
FROM node:16-alpine AS builder

WORKDIR /usr/backend

RUN npm i -g pnpm
COPY ["pnpm-lock.yaml", "./"]
COPY . .

RUN pnpm fetch && pnpm install --offline --frozen-lockfile && pnpm build
RUN pnpm prune --frozen-lockfile --production

# Runner
FROM node:16-alpine AS runner

WORKDIR /usr/backend

COPY .env ./.env
COPY --from=builder /usr/backend/node_modules  ./node_modules
COPY --from=builder /usr/backend/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main"]
