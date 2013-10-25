#!/usr/bin/bash
echo testStart
sudo fswebcam -r 320x240 --flip h --jpeg 95 --no-banner --save $1
echo testOver



