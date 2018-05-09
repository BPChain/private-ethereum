from bp_orchestrator import AbstractSlave, AbstractSetup

from ..project_logger import set_up_logging
from time import sleep
from websocket import create_connection, WebSocket

LOG = set_up_logging(__name__)


class Slave(AbstractSlave):
    def __init__(self, config, setup: AbstractSetup):
        super().__init__(config, setup)
        LOG.info(config)
        LOG.info(setup)
        is_connected = False
        while not is_connected:
            try:
                self.web_socket_address = 'ws://' + config['ipAddress']+':20001'
                LOG.info("Connected")
                is_connected = True
            except Exception as error:
                LOG.error(error)
                sleep(3)

    def is_alive(self):
        try:
            ws = create_connection(self.web_socket_address)
            ws.close()
            return True
        except Exception as error:
            LOG.error(error)
            return False

    def transact(self, name, hex_string):
        LOG.info('----------doing transact for %s', name)
        ws = create_connection(self.web_socket_address)
        res = ws.send(hex_string)
        ws.close()
        LOG.info('-----------result of transact was %d', res)

    @classmethod
    def get_new(cls, config, setup: Setup):
        return Slave(config, setup)
