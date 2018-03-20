#!/usr/bin/env node

// Copyright (c) 2018 Ryota Suzuki
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php

"use strict";

var fs = require('fs');

var fin=fs.readFileSync(process.argv[2], 'utf8');
var lines=fin.split('\n');
var fout="";

var li=0;
while(li<lines.length){
	for(;li<lines.length;++li){
		var line=lines[li];
		if(line.match(/^    \.title/)) break;
		else fout+=line+"\n";
	}
	if(!lines[li-1].match(/^  \+slide/)){
		fout+="\n  +slide\n";
	}
	fout+=lines[li]+"\n";
	++li;
}

fs.writeFileSync( process.argv[2] , fout );
