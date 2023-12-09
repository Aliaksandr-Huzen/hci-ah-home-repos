#!/bin/bash

# modifies react-snap defaultOptions to add the --no-sandbox and --disable-setuid-sandbox flags so that puppeteer/chromium can run in the codebuild standard image
sed -i "s/puppeteerArgs: \[\],/puppeteerArgs: \[\"--no-sandbox\", \"--disable-setuid-sandbox\"\],/" ./node_modules/react-snap/index.js
echo changed arguments in react-snap