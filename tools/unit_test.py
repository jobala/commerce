#!/usr/bin/env python3

#
# Simple but ugly 'unit test' for the one thing on crankwheel.com that currently
# must not fail.
#
# TODO(joi): Move that page to production servers; marketing website is unavailable
# a lot more often than they are.
#

import os
import subprocess
import time
import urllib.request

os.chdir(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

subprocess.Popen(["tools/install_hooks.sh"]).communicate()

web_server = subprocess.Popen(["bundle", "exec", "jekyll", "serve", "--safe"])
try:
  time.sleep(10.0)  # Give the server time to start

  print("FETCHING blank.html - it must return contents that look OK")
  page = urllib.request.urlopen('http://localhost:4000/blank.html')
  contents = page.read().decode("utf-8")
  print(contents)
  if contents.find('EXTENSION_IDS.unshift') != -1:
    print("Basic check says it looks OK... take a manual look above.")
  else:
    print("Basic check FAILED - look above")
finally:
  web_server.terminate()
