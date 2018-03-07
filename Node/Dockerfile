FROM ethereum/client-go:v1.7.3

RUN apk add --update git bash python3 musl-dev gcc python3-dev py3-netifaces nodejs nodejs-npm nano
RUN npm install -g truffle
RUN pip3 install web3 websocket-client pyyaml

COPY files root/files
RUN chmod +x /root/files/start_eth_node.sh
RUN chmod +x /root/files/start_bootstrap.sh
