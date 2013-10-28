
#!/usr/bin/bash
echo testStart
sudo fswebcam -i 0 -r 320x240 --jpeg 95 --no-banner --save $1
echo testOver



