#! /usr/bin/env node

var Match = require('match-files/lib/recurse_directory');

Match.filter('/Users/james/workspace', {}, function(err, files){
	console.log(files);
});