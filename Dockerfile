FROM node:11.13.0-alpine

RUN mkdir -p /usr/src/front

WORKDIR /usr/src/front

RUN apk update && apk upgrade && apk add git

COPY . /usr/src/front/

RUN yarn

RUN yarn build

EXPOSE 3000

ENV NUXT_HOST=0.0.0.0

ENV NUXT_PORT=3000

CMD [ "yarn", "nuxt" ]