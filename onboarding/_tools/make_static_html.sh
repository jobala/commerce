#!/bin/bash

STEP=$1

pushd

rm -rf /tmp/${STEP}_staticdump
mkdir /tmp/${STEP}_staticdump
cd /tmp/${STEP}_staticdump
httrack "http://localhost:4000/onboarding/$STEP/" -K
sed -i -e 's/https:\/\/crankwheel.agilecrm.com\/unsubscribe?e=Enter+Your+Email+Address&amp;sid=5898072429166592&amp;cid=5642425909379072/{{{unsubscribe_link}}}/g' localhost_4000/onboarding/$STEP/index.html
sed -i -e 's/localhost:4000/crankwheel.com/g' localhost_4000/onboarding/$STEP/index.html
cp localhost_4000/onboarding/$STEP/index.html /tmp/$STEP.html
lynx -dump -display_charset UTF-8 /tmp/$STEP.html > /tmp/$STEP.txt
sed -i -e 's/file:\/\/\/tmp\/{{{unsubscribe_link}}}/{{{unsubscribe_link}}}/g' /tmp/$STEP.txt

echo HTML version at /tmp/$STEP.html
echo TXT version at /tmp/$STEP.txt

atom /tmp/$STEP.html
atom /tmp/$STEP.txt

popd
rm -rf /tmp/${STEP}_staticdump
