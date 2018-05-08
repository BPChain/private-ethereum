from ..implementation import Setup
from ..project_logger import set_up_logging

from websocket import create_connection, WebSocket

LOG = set_up_logging(__name__)


class Slave:
    def __init__(self, config, setup: Setup):
        LOG.info(config)
        LOG.info(setup)
        try:
            self.web_socket = create_connection('ws://' + config['ipAddress'], 5)
            LOG.info("Sent data")
            # result = web_socket.recv()
            # LOG.info("Received '%s'", result)
            # web_socket.close()
        except Exception as error:
            LOG.error(error)

    def is_alive(self):
        try:
            self.web_socket.ping()
            return True
        except Exception as error:
            LOG.error(error)
            return False

    def transact(self, name, hex_string):
        self.web_socket.send(hex_string)

    @classmethod
    def get_new(cls, config, setup: Setup):
        return Slave(config, setup)
