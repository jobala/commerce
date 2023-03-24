#!/bin/bash

echo -en "\033[31mDid you run unit tools/unit_tests.py before pushing? [y|n] \033[0m"
echo -en "\033[1m"
read -n 1 -r < /dev/tty
echo -en "\033[0m"

echo
if echo $REPLY | grep -E '^[Yy]$' > /dev/null
then
		exit 0 # push will execute
fi
exit 1 # push will not execute
