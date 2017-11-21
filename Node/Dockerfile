FROM ethereum/client-go
COPY files root/files

RUN apk add --update git bash nodejs nodejs-npm perl

RUN chmod +x /root/files/start.sh

ENTRYPOINT /root/files/start.sh