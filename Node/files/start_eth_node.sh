#!/bin/bash
geth --datadir=~/.ethereum/devchain init "/root/files/blockchain_files/genesis.json"
geth --datadir=~/.ethereum/devchain --password <(echo -n 123)  account new
BOOTSTRAP_IP=`getent hosts bootstrap | cut -d" " -f1`
GETH_OPTS=${@/IPAddress/$BOOTSTRAP_IP}
echo GETH_OPTS
python3 /root/files/node.py &
geth $GETH_OPTS &
cd /root/files/EVAPcoin/scripts/slave && node /root/files/EVAPcoin/scripts/slave/startSimulation.js 20000


