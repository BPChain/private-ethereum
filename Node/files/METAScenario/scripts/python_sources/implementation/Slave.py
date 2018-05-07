from typing import Dict

from ..implementation import Setup
from ..project_logger import set_up_logging

LOG = set_up_logging(__name__)


class Slave:
    def __init__(self, config: Dict, setup: Setup):
        LOG.info(config)
        LOG.info(setup)
        pass

    def is_alive(self):
        pass

    def transact(self, name, hex_string):
        pass

    @classmethod
    def get_new(cls, config, setup: Setup):
        return Slave(config, setup)


