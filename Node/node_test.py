import pytest
import sys
sys.path.insert(0, 'files')
import node
from attrdict import AttrDict

last_sent_block = AttrDict({'blockId': '0', 'difficulty': 2.0, 'timestamp': 1})
blocks = [AttrDict({'blockId': '1', 'difficulty': 2.0, 'timestamp': 2}),
        AttrDict({'blockId': '2', 'difficulty': 3.0, 'timestamp': 3}),
        AttrDict({'blockId': '3', 'difficulty': 4.0, 'timestamp': 4})]

assert node.calculate_avg_block_difficulty(blocks) == 3
assert node.calculate_avg_block_time(blocks, last_sent_block) == 1