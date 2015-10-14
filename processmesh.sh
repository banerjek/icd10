#!/bin/bash

### converts MESH LOD into a single variable containing preferred headings
fgrep 'mesh/D' mesh.nt |fgrep preferredConcept |fgrep 'mesh/M' |sed 's/^.*mesh\/M/M/' |sed 's/>.*$//' | LANG=en_EN sort -u -k 1,1  > goodrecords
fgrep 'rdf-schema#label' mesh.nt |fgrep 'mesh/M' |sed 's/^.*mesh\/M/M/' | sed 's/> <.*label> "/ /' | sed 's/"@.*$//' | LANG=en_EN sort -u -k 1,1 > goodheadings
LANG=en_EN join goodrecords goodheadings |sed 's/^M[0-9]* //' | sort -u | sed 's/@/(at)/' | sed ':a;N;$!ba;s/\n/@/g' > joined
echo 'var mesh="' > mesh.js
cat joined >> mesh.js
echo '";' >> mesh.js
cat mesh.js |sed ':a;N;$!ba;s/\n//g' > junk
mv junk mesh.js
