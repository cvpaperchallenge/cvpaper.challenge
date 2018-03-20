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
		//process.stdout.write(""+li+"\n");
		var line=lines[li];
		fout+=line+"\n";
		if(line.match(/^\s*.timestamp.*/)) break;
	}
	if(li>=lines.length) break;
	var eli=li;
	for(++li;li<lines.length;++li){
		//process.stdout.write("*"+li+"\n");
		var line=lines[li];
		if(line.match(/^\s*.+slide.*/)){
			//correct for this hunk
			fout+=line+"\n";
			break;
		}
		else if(line.match(/^\s*.\.title.*/)){
			//lack of +slide
			fout+="\n";
			fout+="  +slide\n";
			fout+=line+"\n";
			break;
		}
		else
			fout+=line+"\n";
	}
	++li;
}

fs.writeFileSync( process.argv[2] , fout );
