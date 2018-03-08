pragma solidity ^0.4.17;
contract EVAPCoin {

    mapping(address => uint256) allUser;
    mapping(address => string) roles;
    address[] students;

    address master;


    function EVAPCoin() public {
        allUser[msg.sender] = 0;
        roles[msg.sender] = 'master';
        master = msg.sender;
    }

    function balanceOf(address _owner) public constant returns (uint256 balance){
        balance = allUser[_owner];
    }

    function myBalance() public constant returns (uint256 myBalance) {
        myBalance = allUser[msg.sender];
    }

    function generate(uint _value) public hasRole('master') returns (bool success) {
        allUser[msg.sender] = allUser[msg.sender] + _value;
        success = true;
    }


    function registerAsStudent() public hasRole("") returns (bool success) {
        roles[msg.sender] = 'student';
        students.push(msg.sender);
    }

    function getStudents() public hasRole("master") returns (address[] students) {
        return students;
    }

    function registerAsStore() public hasRole("") returns (bool success) {
        roles[msg.sender] = 'store';
    }

    function transfer(address _to, uint256 _value) public hasRole('student') returns (bool success){
        if(balanceOf(msg.sender) >= _value && _value > 0){
            Transfer(msg.sender, _to, _value);
            success = true;
            allUser[msg.sender] = allUser[msg.sender] - _value;
            allUser[_to] = allUser[_to] + _value;
        } else {
            success = false;
        }
    }

    function returnCoins() public hasRole('store') returns (bool success) {
        uint256 value = myBalance();
        if(value > 0) {
           Transfer(msg.sender, master, value);
           allUser[msg.sender] = 0;
           allUser[master] = allUser[master] + value;
          success = true;
        }
    }

    function stringCompare(string _a, string _b) private returns (bool equal) {
        equal = keccak256(_a) == keccak256(_b);
    }

    function printAddress() public constant returns (address self){
    self = msg.sender;
    }

    function printRole() public constant returns(string role) {
    role = roles[msg.sender];
    }

    modifier hasRole (string role) {
        if (stringCompare(roles[msg.sender], role) || stringCompare(roles[msg.sender], "master")) {
            _;
        }
        else {
            throw;
        }
    }

    event Transfer(address indexed _from, address indexed _to, uint256 _value);

}
