#! /bin/bash
cat mesh.txt |grep "^MH \|^MN" |sed 's/MN = \(.*$\)/<c>[\1]<\/c>/' |tr -d "\n" |sed 's/MH = /@/g' > mesh.js
