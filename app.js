"use strict";

////////////////////////////////
//----------------------------//
// Copyright (c) 2018 NullDev //
//----------------------------//
////////////////////////////////

let github = require("octokat");
let cron   = require("cron").CronJob;
let fs     = require("fs");

let mutelog  = false,
    initCron = false; 

let timeDefault    = 20,
    timeMaxDefault = 18,
    timeMinDefault = 7;

require.extensions[".json"] = function (module, filename) { module.exports = fs.readFileSync(filename, "utf8"); };
let jsondata = require("./config.json");
let raw      = JSON.parse(jsondata);

let time = (raw.cron.time == 24) ? 0 : raw.cron.time;
let TZ   = Intl.DateTimeFormat().resolvedOptions().timeZone;

let randomTime = raw.random.random_enabled;
let randomMin  = (raw.random.random_min_hour == 24) ? 0 : raw.random.random_min_hour;
let randomMax  = (raw.random.random_max_hour == 24) ? 0 : raw.random.random_max_hour;

initCron = raw.cron.commit_at_start;

let args = process.argv;
args = args.map(v => v.toLowerCase());

if (args.indexOf("-m") > -1 || args.indexOf("--mute")   > -1) mutelog    = true; 
if (args.indexOf("-c") > -1 || args.indexOf("--commit") > -1) initCron   = true;
if (args.indexOf("-r") > -1 || args.indexOf("--random") > -1) randomTime = true;

function log(text, init){
    if (!mutelog && !init) console.log(getTS() + "\xa0" + text); 
    function nl(){ if (!mutelog) console.log("\xa0"); }
    log.nl = nl;
}
log(null, true);

log.nl();
log("Started!\n");

function performCron(){
    let user = raw.auth.username,
        pass = raw.auth.password,
        base = raw.auth.is_base64;

    let repo = raw.file.repository,
        file = raw.file.streakfile;

    let oath = raw.auth.oauth.use_oauth,
        otok = raw.auth.oauth.token;

    if (base) pass = atob(pass);

    let git;

    if (raw.auth.oauth.use_oauth) git = new github({
        username: user,
        password: pass
    });

    else git = new github({
        token: otok
    });

    let r = git.repos(user, repo);

    r.contents(file).fetch().then((i) => {
        let s = i.content;

        let fin = atob(s);

        fin = parseInt(fin);
        if (fin.toString().toLowerCase() == "nan") fin = 0;

        let sha = i.sha;
        doCommit(fin, sha);
    });

    function doCommit(str, sha){
        let day = ++str;
        day = (day < 10 ? "0" : "") + day;

        let stk = btoa(day);

        let config = {
            message: "Streak Day " + day,
            content: stk,
            sha: sha
        }

        r.contents(file).add(config).then((info) => { log("Day " + day + ": New SHA is " + info.commit.sha); });
    }
} 

function staticCron() {
    let hrs = new Date().getHours(),
        min = new Date().getMinutes();

    let hrsF = (hrs < 10 ? "0" : "") + hrs;
    let minF = (min < 10 ? "0" : "") + min;

    let crontime = null;

    if (isNaN(time)){
        time = timeDefault;
        log("Warning: Time invalid! Set to default (" + timeDefault + ")");
    }
    crontime = "0 " + time + " * * *";
    log("Cron Type: Static");
    log("Cronjob: " + crontime);
    log("Current time: " + hrsF + ":" + minF + " (" + toFormat(hrs, min) + ")")
    log("Executing at: " + ((time < 10 ? "0" : "") + time) + ":00 (" + toFormat(time, 0) + ")");
    log("Timezone: " + TZ);
    log.nl();
    new cron(crontime, function() { performCron(); }, null, true, TZ); 
}

function randomCron() {
    log("Cron Type: Random");
    if (isNaN(randomMax)){
        randomMax = timeMaxDefault;
        log("Warning: Max Random Time invalid! Set to default (" + timeMaxDefault + ")");
    }
    if (isNaN(randomMin)){
        randomMin = timeMinDefault;
        log("Warning: Min Random Time invalid! Set to default (" + timeMinDefault + ")");
    }
    if (randomMax <= randomMin){
        randomMax = timeMaxDefault;
        randomMin = timeMinDefault;
        log("Warning: Min Random Time has to be lower than Max Random Time! Set to defaults (" + timeMinDefault + ", " + timeMaxDefault + ")");
    }
    //TODO
}

function atob(str) { return new Buffer(str, 'base64').toString('binary'); }

function btoa(str) {
    var buffer;
    (str instanceof Buffer) ? (buffer = str) : (buffer = new Buffer(str.toString(), 'binary'));
    return buffer.toString('base64');
}

function toFormat(hrs, mins){
    mins = (mins == 0) ? "00" : (mins >= 10) ? mins : "0" + mins;
    return (hrs > 12) ? ((((hrs - 12) < 10 ? "0" : "") + (hrs - 12))  + ":" + mins + " PM") : (((hrs < 10 ? "0" : "") + hrs) + ":" + mins + " AM"); 
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

function main(){
    if (initCron) performCron();
    randomTime ? randomCron() : staticCron();
}

main();
