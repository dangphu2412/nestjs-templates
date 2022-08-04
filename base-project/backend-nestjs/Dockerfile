FROM node:16-alpine

WORKDIR /usr/backend

COPY package.json yarn.lock /usr/backend/

RUN yarn install --frozen-lockfile

COPY . /usr/app

RUN yarn build
RUN rm -rf node_modules
RUN yarn cache clean

RUN yarn install --production

EXPOSE 3000

CMD ["yarn", "start"]
