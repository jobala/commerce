#!/bin/bash

# This script does nothing but install our git hooks into .git/hooks. It
# should be invoked by commonly-used scripts to ensure the hooks get installed
# in all devevelopers' repos.

cd ${0%/*}/..

PRE_PUSH=`pwd`/tools/githooks/pre-push.sh
ln -s $PRE_PUSH ./.git/hooks/pre-push 2> /dev/null
