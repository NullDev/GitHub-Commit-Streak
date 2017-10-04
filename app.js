"use strict";
var github = require('octokat');
var cron   = require('cron').CronJob;
var fs     = require('fs');

////////////////////////////////
//----------------------------//
// Copyright (c) 2017 NullDev //
//----------------------------//
////////////////////////////////

var mutelog = false;

require.extensions['.json'] = function (module, filename) { module.exports = fs.readFileSync(filename, 'utf8'); };
var jsondata = require('./config.json');
var raw      = JSON.parse(jsondata);

var time = (raw.cron.time == 24) ? 0 : raw.cron.time;
var TZ   = Intl.DateTimeFormat().resolvedOptions().timeZone;

var crontime = "0 " + time + " * * *";

var hrs = new Date().getHours(),
	min = new Date().getMinutes();

var args = process.argv;
args = args.map(v => v.toLowerCase());

if (args.indexOf("-m") > -1 || args.indexOf("--mute")   > -1) mutelog = true;
if (args.indexOf("-c") > -1 || args.indexOf("--commit") > -1) performCron(); 

function log(text, init){
	if (!mutelog) if (!init) console.log(getTS() + "\xa0" + text); 
	function nl(){ if (!mutelog) console.log("\xa0"); }
	log.nl = nl;
}
log(null, true);

log.nl();
log("Started!\n");
log("Cronjob: " + crontime);
log("Current time: " + hrs + ":" + min + " (" + toFormat(hrs, min) + ")")
log("Executing at: " + time + ":00 (" + toFormat(time, 0) + ")");
log("Timezone: " + TZ);
log.nl();

function performCron(){
	var user = raw.auth.username,
		pass = raw.auth.password,
		base = raw.auth.is_base64;

	var repo = raw.file.repository,
		file = raw.file.streakfile;

	if (base){
		var buf = new Buffer(pass.toString());
		pass = buf.toString('base64');
	}

	var git = new github({
		username: user,
		password: pass
	});

	var r = git.repos(user, repo);

	r.contents(file).fetch().then((i) => {
		var b   = null, 
			fin = null;
		var s = i.content;
		if (!isset(s) || isNaN(s) || s <= 0) fin = 0;
		else {
			b = Buffer.from(s, 'base64');
			fin = b.toString();
		}
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

		r.contents(file).add(config).then((info) => { log("Day " + day + ": New SHA is " + info.commit.sha); });
	}
}

new cron(crontime, function() { performCron(); }, null, true, TZ);

function toFormat(hrs, mins){
	mins = (mins == 0) ? "00" : (mins >= 10) ? mins : "0" + mins;
	return (hrs > 12) ? (hrs - 12 + ":" + mins + " PM") : (hrs + ":" + mins + " AM"); 
}

function isset(_var) { return (_var && _var != null && _var != "") ? true : false; }

function getTS() {
	var date = new Date();
	var hour = date.getHours(),
		min  = date.getMinutes(),
		sec  = date.getSeconds();

	hour  = (hour < 10 ? "0" : "") + hour;
	min   = (min  < 10 ? "0" : "") + min;
	sec   = (sec  < 10 ? "0" : "") + sec;

	return "[" + hour + "h:" + min + "m:" + sec + "s]";
}
