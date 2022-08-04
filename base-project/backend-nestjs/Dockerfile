FROM node:16-alpine AS development

WORKDIR /usr/backend

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

FROM node:16-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/backend

COPY package.json yarn.lock ./

RUN yarn install --production

COPY . .

COPY --from=development /usr/backend/dist ./dist

EXPOSE 3000

CMD ["npm", "run", "start"]
