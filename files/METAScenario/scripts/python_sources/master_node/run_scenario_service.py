"""I start the scenario service"""
from time import sleep

from bp_orchestrator import orchestrate
from ..implementation.slave import Slave

if __name__ == '__main__':
    sleep(7)
    print('-----------starting')
    orchestrate(20000, Slave)
    print('-----------started')
