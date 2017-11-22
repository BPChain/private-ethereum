FROM ethereum/client-go
COPY files root/files

RUN apk add --update git bash nodejs nodejs-npm perl
RUN apk update
RUN apk add --update nodejs
RUN npm install web3

RUN chmod +x /root/files/start.sh

ENTRYPOINT /root/files/start.sh
