FROM ethereum/client-go
COPY files root/files

RUN apk update
RUN apk add --update git bash nodejs nodejs-npm perl
RUN npm install web3@^0.20.0

RUN chmod +x /root/files/start.sh

ENTRYPOINT /root/files/start.sh
