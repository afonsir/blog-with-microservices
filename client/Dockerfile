FROM node:alpine

ENV CI=true

WORKDIR /app

COPY package.json yarn.lock ./

RUN npm install

COPY ./ ./

CMD ["npm", "start"]
