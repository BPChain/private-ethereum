"""I test the functionality provided by the node.py file."""

from unittest.mock import Mock
from attrdict import AttrDict

from Node.files import node

LAST_SENT_BLOCK = AttrDict({'number': 0, 'difficulty': 2.0, 'timestamp': 1})
BLOCKS = [AttrDict({'number': 1, 'difficulty': 2.0, 'timestamp': 2}),
          AttrDict({'number': 2, 'difficulty': 3.0, 'timestamp': 3}),
          AttrDict({'number': 3, 'difficulty': 4.0, 'timestamp': 4})]


def test_avg_difficulty():
    assert node.calculate_avg_block_difficulty(BLOCKS) == 3


def test_avg_difficulty_no_blocks():
    assert node.calculate_avg_block_difficulty([]) == 0


def test_avg_difficulty_only_one_block():
    assert node.calculate_avg_block_difficulty([LAST_SENT_BLOCK]) == 2


def test_avg_block_time():
    assert node.calculate_avg_block_time(BLOCKS, LAST_SENT_BLOCK) == 1


def test_avg_block_time_for_initial():
    assert node.calculate_avg_block_time(BLOCKS, None) == 0


def test_avg_block_time_no_new_blocks():
    assert node.calculate_avg_block_time([], LAST_SENT_BLOCK) == 0


def test_provide_data_for_first_block():
    def getBlock(num):
        num = 3 if num == 'latest' else num
        return ([LAST_SENT_BLOCK] + BLOCKS)[num]

    web3 = Mock()
    web3.eth.getBlock = getBlock
    number_of_last_block = 0
    node_data = {"avgDifficulty": 0, "avgBlocktime": 0}
    last_b_num, node_data = node.provide_data(number_of_last_block, node_data, web3)
    assert last_b_num == 3
    assert node_data['avgDifficulty'] == 0
    assert node_data['avgBlocktime'] == 0


def test_provide_data():
    def getBlock(num):
        num = 3 if num == 'latest' else num
        return BLOCKS[num - 1]

    web3 = Mock()
    web3.eth.getBlock = getBlock
    number_of_last_block = 1
    node_data = {"avgDifficulty": 0, "avgBlocktime": 0}
    last_b_num, node_data = node.provide_data(number_of_last_block, node_data, web3)
    assert last_b_num == 3
    assert node_data['avgDifficulty'] == 3.5
    assert node_data['avgBlocktime'] == 1


def test_provide_data_no_new_blocks():
    def getBlock(num):
        num = 0 if num == 'latest' or num == 1 else IndexError
        return BLOCKS[num]

    web3 = Mock()
    web3.eth.getBlock = getBlock
    number_of_last_block = BLOCKS[0].number
    node_data = {"avgDifficulty": 3, "avgBlocktime": 4.4}
    last_b_num, node_data = node.provide_data(number_of_last_block, node_data, web3)
    assert last_b_num == BLOCKS[0].number
    assert node_data['avgDifficulty'] == 3
    assert node_data['avgBlocktime'] == 4.4


def test_retrive_new_blocks_since():
    def getBlock(num):
        num = 3 if num == 'latest' else num
        return ([LAST_SENT_BLOCK] + BLOCKS)[num]

    web3 = Mock()
    web3.eth.getBlock = getBlock
    last_block_num, new_blocks = node.retrieve_new_blocks_since(0, web3)
    assert last_block_num == BLOCKS[2].number
    assert new_blocks == BLOCKS


def test_retrieve_new_blocks_no_new_blocks():
    def getBlock(num):
        num = 3 if num == 'latest' else IndexError()
        return ([LAST_SENT_BLOCK] + BLOCKS)[num]

    web3 = Mock()
    web3.eth.getBlock = getBlock
    last_block_num, new_blocks = node.retrieve_new_blocks_since(3, web3)
    assert last_block_num == 3
    assert new_blocks == []


def test_node_data_format():

    def getBlock(num):
        num = 0 if num == 'latest' or num == 1 else IndexError
        return BLOCKS[num]

    web3 = Mock()
    web3.eth.getBlock = getBlock
    number_of_last_block = BLOCKS[0].number
    node_data = {"avgDifficulty": 3, "avgBlocktime": 4.4}
    _, node_data = node.provide_data(number_of_last_block, node_data, web3)
    demo_data = {"hostId": 1, "hashrate": 1, "gasPrice": 1,
                 "avgDifficulty": 1, "avgBlocktime": 1,
                 "isMining": 1}
    for key in demo_data:
        assert key in node_data


if __name__ == "__main__":
    test_retrive_new_blocks_since()
    test_provide_data()
    test_provide_data_for_first_block()
    test_avg_difficulty()
    test_avg_block_time()
    test_avg_block_time_for_initial()
    test_avg_block_time_no_new_blocks()
