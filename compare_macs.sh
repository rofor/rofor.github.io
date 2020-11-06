#!/bin/bash
comm --check-order -1  <(sort macs_deployed.txt) <(macs_online.txt)