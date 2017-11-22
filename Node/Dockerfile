FROM ethereum/client-go
COPY files root/files

RUN apk add --update git bash python2 musl-dev py-pip gcc python-dev
RUN pip install web3

RUN chmod +x /root/files/start.sh

ENTRYPOINT /root/files/start.sh
