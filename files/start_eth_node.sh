#!/bin/bash
geth --datadir=~/.ethereum/devchain init "/root/files/blockchain_files/genesis.json"
geth --datadir=~/.ethereum/devchain --password <(echo -n 123)  account new
BOOTSTRAP_IP=`getent hosts eth_bootstrap | cut -d" " -f1`
GETH_OPTS=${@/IPAddress/$BOOTSTRAP_IP}
python3 -m root.files.node &
geth $GETH_OPTS &
cd /root/files/METAScenario/scripts/slave &&
node /root/files/METAScenario/scripts/slave/startSimulation.js


