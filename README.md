# Private ethereum

Master-Branch: [![Build Status](https://travis-ci.org/BPChain/private-ethereum.svg?branch=master)](https://travis-ci.org/BPChain/private-ethereum) <br />
Dev-Branch: [![Build Status](https://travis-ci.org/BPChain/private-ethereumr.svg?branch=dev)](https://travis-ci.org/BPChain/private-ethereum)  <br />

### Structure
Run Ethereum in docker. We have three different docker images. eth_node for running a blockchain node. eth_contract_deployer for running the scenario simulation and eth_bootstrap for initializing the blockchain and interconnecting all eth_nodes.

### eth_node files
1. [`data_collection`](https://github.com/BPChain/private-ethereum/blob/master/files/data_collection.py) which sends the runtime data of the chain to a server. 
2. [`scenario_slave`](https://github.com/BPChain/private-ethereum/blob/master/files/METAScenario/scripts/python_sources/implementation/slave.py)
which runs a websocket receiving transaction commands from the [`contract_deployer`](https://github.com/BPChain/private-ethereum/blob/master/files/METAScenario/scripts/python_sources/master_node/run_scenario_service.py)
3. [`scenario_execution_scripts`](https://github.com/BPChain/private-ethereum/tree/master/files/METAScenario/scripts) which implements the ethereum specific execution of a transaction. They are connected with the [`scenario_slave`](https://github.com/BPChain/private-ethereum/blob/master/files/METAScenario/scripts/python_sources/implementation/slave.py)


### eth_contract_deployer files
1. [`data_collection`](https://github.com/BPChain/private-ethereum/blob/master/files/data_collection.py) which sends the runtime data of the chain to a server.
2.  [`contract_migration`](https://github.com/BPChain/private-ethereum/blob/master/files/METAScenario/startMigration.js) which deploys the smart contract to run transaction with a specific payload. It also opens a websocket connection for retrieving the smart contract address, so the nodes are able to use the same smart contract instance.
3. [`master`](https://github.com/BPChain/private-ethereum/tree/master/files/METAScenario/scripts/python_sources/master_node) contains the main entry point to start the 
[`scenario-orchestration-service`](https://github.com/BPChain/scenario-orchestration-service) which 
listens for input from the [`private-chain-controller` ](https://github.com/BPChain/private-chain-controller)
at port 22000. 

### eth_bootstrap files
1. [`Blockchain genesis file`](https://github.com/BPChain/private-ethereum/tree/master/files/blockchain_files) which includes the genesis.json to initialize the blockchain

### Docker Setup
All nodes use the same Dockerfile but have different entrypoints defined in the [`docker-compose.yml`](https://github.com/BPChain/private-ethereum/blob/dev/docker-compose.yml).
To run the blockchain just start it by running docker-compose up. Please note that scaling is allowed only on the xain_node.

