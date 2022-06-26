FROM node:14-alpine

WORKDIR /usr/app

COPY package*.json /usr/app/

RUN npm install

COPY . /usr/app

RUN npm run build

RUN npm prune --production

EXPOSE 3000

CMD ["npm", "start"]
