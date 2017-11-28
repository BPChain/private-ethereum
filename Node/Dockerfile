FROM ethereum/client-go

RUN apk add --update git bash python3 musl-dev gcc python3-dev
RUN pip3 install web3

COPY files root/files
RUN chmod +x /root/files/start_eth_node.sh
RUN chmod +x /root/files/start_bootstrap.sh


