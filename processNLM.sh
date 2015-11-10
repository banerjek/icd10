#! /bin/bash
cat index_*.html |tr -d "\n" | sed "s/<dt class='@@MI'>/\n@@MI/g" | fgrep "@@MI" | sed 's/^.*<a name=[^>]*>//' | sed 's/<dd style=[^>]*>/<dd>/g' | sed 's/&nbsp;//g' | sed 's/ see <a[^>]*>\([^<]*\)<\/a>/<see>\1<\/see>/g' | sed 's/See also \([^<]*\)<a[^>]*>\([^<]*\)<\/a>/<sa>\1\2<\/sa>/g' | sed 's/<a href="class[^>]*>\([^<]*\)<\/a>/<c>\1<\/c>/g' |sed 's/<\/dt>//g' |sed 's/<\/a><\/b>//g' | sed '/^</ d' |sed 's/<a[^>]*>//g' |sed 's/<\/a>//g' |sed 's/ \([QW][A-Z] [0-9A-Z\.\-]*\)/<c>\1<\/c>/g' | sed 's/ <c>/<c>/g' |sed 's/<\/c> /<\/c>/g' |sed 's/c>\([QW][A-Z]\) /c>\1/g' |sed 's/"/\\"/g' |tr "\n" "@" > nlm.js

