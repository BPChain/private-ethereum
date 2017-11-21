FROM ethereum/client-go

RUN apk add --update git bash nodejs nodejs-npm perl

RUN cd /root/files &&\
    npm install &&\

RUN chmod +x /root/start.sh

ENTRYPOINT /root/start.sh