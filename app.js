"use strict";

var github = require('octokat');

require.extensions['.json'] = function (module, filename) { module.exports = fs.readFileSync(filename, 'utf8'); };
var jsondata = require('./config.json');
var raw      = JSON.parse(jsondata);

var user = raw.auth.username;
var pass = raw.auth.password;

var repo = raw.file.repository;
var file = raw.file.streakfile;

var git = new github({
	username: user,
	password: pass
});
 
var r = git.repos(user, repo);

r.contents(file).fetch().then((i) => {
	var s = i.content;
	var b = Buffer.from(s, 'base64');

	var fin = b.toString();
	var sha = i.sha;
	doCommit(fin, sha);
});

function doCommit(str, sha){
	str = parseInt(str);
	var day = ++str;

	var buf = new Buffer(day.toString());
	var stk = buf.toString('base64');

	var config = {
		message: 'Streak Day ' + day,
		content: stk,
		sha: sha
	}

	r.contents(file).add(config).then((info) => {
		console.log("Day " + day + ": New SHA is " + info.commit.sha);
		process.exit(0);
	});
}
