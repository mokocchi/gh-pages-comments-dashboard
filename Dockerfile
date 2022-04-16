FROM node:16-alpine AS builder

WORKDIR /opt/web
COPY package*.json ./
RUN yarn install

ENV PATH="./node_modules/.bin:$PATH"

COPY . ./
RUN yarn build

FROM nginx:1.21-alpine
RUN apk --no-cache add gettext
COPY ./nginx.config /etc/nginx/nginx.template

COPY --from=builder /opt/web/build /usr/share/nginx/html

WORKDIR /usr/share/nginx/html

COPY ./env.sh .
COPY .env-template .

# Add bash
RUN apk add --no-cache bash

# Make our shell script executable
RUN chmod +x env.sh

CMD envsubst '$PORT' < /etc/nginx/nginx.template > /etc/nginx/conf.d/default.conf && \
    envsubst < /usr/share/nginx/html/.env-template > /usr/share/nginx/html/.env && \
    bash /usr/share/nginx/html/env.sh && \
    nginx -g "daemon off;"