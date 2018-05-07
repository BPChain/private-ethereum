FROM ethereum/client-go:latest

RUN apk add --update git bash python3 musl-dev gcc python3-dev py3-netifaces nodejs nodejs-npm nano
RUN npm install -g truffle
COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY .ethash root/.ethash
COPY files root/files
RUN cd /root/files && npm install
RUN chmod +x /root/files/start_eth_node.sh
RUN chmod +x /root/files/start_bootstrap.sh
RUN chmod +x /root/files/start_eth_contract_deployer.sh
