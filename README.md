# Data aggregator

This is the blockchain backend, which interconnects several hosts to participate in a blockchain. Each host sends its statistics eg. hashrate to a server which is not implemented here.
Therefore this repository includes the python scripts which run on the host and the blockchain definition data which are used to create the blockchain.

## Setup
Install Docker-compose.
Clone the repository and go into the Node folder. There you can execute the following command: `docker-compose up --build`

This will run one blockchain and one backend node. The backend node is required to interconnect all blockchain nodes, so all participate in the same blockchain.
From now each blockchain node will start mining and sending data to the server. To add more blockchain nodes, execute the following command: `docker-compose scale eth_node=X` where X is the number of desired hosts in the network

## Useful commands

### Docker specific:

Access docker node terminal: ``docker exec -ti node_eth_node_1  /bin/bash``

Show all docker nodes: ``docker ps -aq --filter name=eth_node``

Stop all docker nodes: ``docker ps -aq --filter name=eth_node | xargs docker stop``

Remove all docker nodes: ``docker ps -aq --filter name=eth_node | xargs docker rm``

Show current docker log: ``docker-compose logs -f --tail=0``

Solving the service endpoint already connected issue: 

``for i in ` docker network inspect -f '{{range .Containers}}{{.Name}} {{end}}' backendnet`;\
  do \
     docker network disconnect -f backendnet $i; \
  done;
  ``
  
  This disconnects all eth_node docker images from the network
  
  ### Geth:
  
  Connecting to the geth console when connected to the terminal of a single node:
  
  ``geth attach ipc:/root/.ethereum/devchain/geth.ipc``
