pragma solidity ^0.4.17;
contract METAScenario {

    mapping(address => uint256) allUser;
    mapping(address => bytes) allUserData;
    address[] public students;

    address master;


    function METAScenario() public {
        allUser[msg.sender] = 0;
        master = msg.sender;
    }

    function balanceOf(address _owner) public constant returns (uint256 balance){
        balance = allUser[_owner];
    }

    function myBalance() public constant returns (uint256 myBalance) {
        myBalance = allUser[msg.sender];
    }

    function generate(uint _value) public returns (bool success) {
        allUser[msg.sender] = allUser[msg.sender] + _value;
        success = true;
    }


    function transfer(address _to, uint256 _value, bytes _data) public returns (bool success){
        if(balanceOf(msg.sender) >= _value && _value > 0){
            Transfer(msg.sender, _to, _value, _data);
            success = true;
            allUserData[_to] = _data;
            allUser[msg.sender] = allUser[msg.sender] - _value;
            allUser[_to] = allUser[_to] + _value;
        } else {
            success = false;
        }
    }



    function stringCompare(string _a, string _b) private returns (bool equal) {
        equal = keccak256(_a) == keccak256(_b);
    }

    function printAddress() public constant returns (address self){
    self = msg.sender;
    }


    event Transfer(address indexed _from, address indexed _to, uint256 _value, bytes _data);

}
