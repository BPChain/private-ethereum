var abi = JSON.parse('[{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"students","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"},{"indexed":false,"name":"_data","type":"bytes"}],"name":"Transfer","type":"event"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"myBalance","outputs":[{"name":"myBalance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"generate","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"},{"name":"_data","type":"bytes"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"printAddress","outputs":[{"name":"self","type":"address"}],"payable":false,"stateMutability":"view","type":"function"}]')
const Web3 = require('web3')
const ws = require('ws')
const WebSocketServer = ws.Server
const requiredBalance = 9999999999
var web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:8547"))
function start() {
    try {
        var account = web3.eth.accounts[0];
        if(web3.eth.getBalance(account).toString(10) > requiredBalance) {
            console.log("Starting deploying")
            web3.eth.defaultAccount = account
            web3.personal.unlockAccount(account, "123")
            var metascenarioContract = web3.eth.contract(abi);
            var metascenario = metascenarioContract.new(
                {
                    from: account,
                    data: '0x608060405234801561001057600080fd5b5060008060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555033600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550610746806100a56000396000f300608060405260043610610078576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306ead22e1461007d5780634a7dd523146100ea57806370a082311461012f578063be45fd6214610186578063c9116b6914610231578063eca065de1461025c575b600080fd5b34801561008957600080fd5b506100a8600480360381019080803590602001909291905050506102b3565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156100f657600080fd5b50610115600480360381019080803590602001909291905050506102f1565b604051808215151515815260200191505060405180910390f35b34801561013b57600080fd5b50610170600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919050505061037f565b6040518082815260200191505060405180910390f35b34801561019257600080fd5b50610217600480360381019080803573ffffffffffffffffffffffffffffffffffffffff16906020019092919080359060200190929190803590602001908201803590602001908080601f01602080910402602001604051908101604052809392919081815260200183838082843782019150505050505091929192905050506103c7565b604051808215151515815260200191505060405180910390f35b34801561023d57600080fd5b50610246610627565b6040518082815260200191505060405180910390f35b34801561026857600080fd5b5061027161066d565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6002818154811015156102c257fe5b906000526020600020016000915054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000816000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054016000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555060019050919050565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b6000826103d33361037f565b101580156103e15750600083115b1561061b578373ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fe19260aff97b920c7df27010903aeb9c8d2be5d310a2c67824cf3f15396e4c1685856040518083815260200180602001828103825283818151815260200191508051906020019080838360005b8381101561047d578082015181840152602081019050610462565b50505050905090810190601f1680156104aa5780820380516001836020036101000a031916815260200191505b50935050505060405180910390a36001905081600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020908051906020019061050f929190610675565b50826000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054036000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550826000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054016000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550610620565b600090505b9392505050565b60008060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905090565b600033905090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106106b657805160ff19168380011785556106e4565b828001600101855582156106e4579182015b828111156106e35782518255916020019190600101906106c8565b5b5090506106f191906106f5565b5090565b61071791905b808211156107135760008160009055506001016106fb565b5090565b905600a165627a7a723058206e44b09e0f346b5e0375d5c8287824203cbe1ed8ac480c9ca0bc7c190f16348e0029',
                    gas: '4700000'
                }, function (error, contract) {
                    if (error) {
                        console.log("&&&&&&&&&&&&&&&&&&&&&&&InContractError&&&&&&&&&&&&&&&&&&&&")
                        console.log(error)
                        setTimeout(function () {
                            start()
                        }, 5000)
                    }
                    else if (!contract.address) {
                        console.log("no address yet")
                    } else {
                        try {
                            console.log(contract.address)
                            startWebSocket(contract.address)
                        } catch (error) {
                            setTimeout(function () {
                                startWebSocket(contract.address)
                            }, 10000)
                        }
                    }
                })
        } else {
            setTimeout(function () {
                start()
            }, 10000)
        }

    } catch (error) {
        console.log(error)
        setTimeout(function () {
            start()
        }, 10000)
    }


}

function startWebSocket(contractAddress) {
    const wsServer = new WebSocketServer({port: 40000})
    wsServer.on('connection', function (connection) {
        connection.send(contractAddress)
    })
    ws.onerror = function (event) {
        console.log("Contract address WebSocket not reachable")
        ws.close()
    }
    ws.onclose = function (event) {
        setTimeout(function () {
            startWebSocket(contractAddress)
        }, 10000)
    }

}

start()

