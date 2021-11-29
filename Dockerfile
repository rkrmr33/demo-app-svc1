FROM node:16-alpine3.13

WORKDIR /app

COPY . .

RUN apk -U add --no-cache yarn curl ca-certificates openssl && update-ca-certificates

# See https://stackoverflow.com/a/55757473/12429735RUN 
RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "/home/svc1" \
    --shell "/sbin/nologin" \
    --no-create-home \
    --uid "10001" \
    "svc1"

RUN yarn install --production

ENTRYPOINT ["yarn"]
CMD [ "start" ]
