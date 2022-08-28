FROM node:alpine

WORKDIR /usr/src/node-app

COPY package.json yarn.lock ./

RUN yarn install --pure-lockfile --ignore-scripts

COPY . .

EXPOSE 3000

USER node

CMD yarn start
