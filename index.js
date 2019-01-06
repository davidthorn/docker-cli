#!/usr/bin/env node

if(process.argv.length !== 3) {
	process.stdout.write('The third argument is required ' +  process.argv.length );
	return 1
}

const fs = require('fs');
const execSync = require('child_process').execSync;

const result = execSync('docker inspect mysql1')
const json = JSON.parse(result.toString('utf8'), null , 2);

let output = json[0];
let current = output;

switch(process.argv[2]){
    case 'ipaddress':
	const data = execSync('docker-cli NetworkSettings.Networks.bridge.IPAddress');
	try {
	   console.log(JSON.parse(data.toString('utf8')));

	} catch(error) {
		console.log(data.toString('utf8').trim())
	}
		
	return 1
    break;
    default: break;
}


let parts = process.argv[2].split('.');

while(parts.length > 0) {
	const part = parts.shift();
	if(current[part] === undefined) continue
	output = current[part];   
	current = output;
}
console.dir(output, {depth: null, colors: true})
