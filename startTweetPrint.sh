

#!/bin/bash
cd node
sudo forever start interact.js
cd ../
sudo python printImage.py
echo "Started Like A Bawss!"
