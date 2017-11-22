#!/bin/bash
geth --datadir=~/.ethereum/devchain init "/root/files/blockchain_files/genesis.json"
BOOTSTRAP_IP=`getent hosts bootstrap | cut -d" " -f1`
GETH_OPTS=${@/IPAddress/$BOOTSTRAP_IP}
echo 'Schranz'
echo $GETH_OPTS
geth $GETH_OPTS
#node /root/files/node.js
