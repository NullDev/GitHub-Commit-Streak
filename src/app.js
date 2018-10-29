"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

let Github = require("octokat");
let Cron = require("cron").CronJob;

let log = require("./utils/logger");
let conf = require("./utils/configHandler");

let initCron = false;

let timeDefault    = 20;
let timeMaxDefault = 18;
let timeMinDefault = 7;

let raw = conf.getConfig();

let time = (raw.cron.time === 24) ? 0 : raw.cron.time;
let TZ = Intl.DateTimeFormat().resolvedOptions().timeZone;

let randomTime = raw.random.random_enabled;
let randomMin  = (raw.random.random_min_hour === 24) ? 0 : raw.random.random_min_hour;
let randomMax  = (raw.random.random_max_hour === 24) ? 0 : raw.random.random_max_hour;

initCron = raw.cron.commit_at_start;

let args = process.argv;
args = args.map(v => v.toLowerCase());

if (args.indexOf("-m") > -1 || args.indexOf("--mute")   > -1) mutelog    = true;
if (args.indexOf("-c") > -1 || args.indexOf("--commit") > -1) initCron   = true;
if (args.indexOf("-r") > -1 || args.indexOf("--random") > -1) randomTime = true;

let atob = str => Buffer.from(str, "base64").toString("binary");
let btoa = str => Buffer.from(str, "binary").toString("base64");

let toFormat = function(hrs, mins){
    let minsFix;

    if (mins === 0) minsFix = "00";
    else if (mins >= 10) minsFix = mins;
    else minsFix = "0" + mins;

    return (hrs > 12) ? ((((hrs - 12) < 10 ? "0" : "") + (hrs - 12))  + ":" + minsFix + " PM") : (((hrs < 10 ? "0" : "") + hrs) + ":" + minsFix + " AM");
};

function performCron(){
    let user = raw.auth.username;
    let pass = raw.auth.password;
    let base = raw.auth.is_base64;

    let repo = raw.file.repository;
    let file = raw.file.streakfile;

    let oath = raw.auth.oauth.use_oauth;
    let otok = raw.auth.oauth.oauth_token;

    if (base) pass = atob(pass);

    let git;

    if (raw.auth.oauth.use_oauth){
        git = new Github({
            token: otok
        });
    }

    else {
        git = new Github({
            username: user,
            password: pass
        });
    }

    let r = git.repos(user, repo);

    r.contents(file).fetch().then((i) => {
        let s = i.content;

        let fin = atob(s);

        fin = parseInt(fin, 10);
        if (fin.toString().toLowerCase() === "nan") fin = 0;

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
        };

        r.contents(file).add(config).then((info) => { log("Day " + day + ": New SHA is " + info.commit.sha); });
    }
}

function staticCron(){
    let hrs = new Date().getHours();
    let min = new Date().getMinutes();

    let hrsF = (hrs < 10 ? "0" : "") + hrs;
    let minF = (min < 10 ? "0" : "") + min;

    let crontime = null;

    if (isNaN(time)){
        time = timeDefault;
        log.warn("Time invalid! Set to default (" + timeDefault + ")");
    }

    crontime = "0 " + time + " * * *";
    log.info("Cron Type: Static");
    log.info("Cronjob: " + crontime);
    log.info("Current time: " + hrsF + ":" + minF + " (" + toFormat(hrs, min) + ")");
    log.info("Executing at: " + ((time < 10 ? "0" : "") + time) + ":00 (" + toFormat(time, 0) + ")");
    log.info("Timezone: " + TZ);

    let cron = new Cron(crontime, function(){
        performCron();
    }, null, true, TZ);
}

function randomCron() {
    log.info("Cron Type: Random");
    if (isNaN(randomMax)){
        randomMax = timeMaxDefault;
        log.warn("Warning: Max Random Time invalid! Set to default (" + timeMaxDefault + ")");
    }
    if (isNaN(randomMin)){
        randomMin = timeMinDefault;
        log.warn("Warning: Min Random Time invalid! Set to default (" + timeMinDefault + ")");
    }
    if (randomMax <= randomMin){
        randomMax = timeMaxDefault;
        randomMin = timeMinDefault;
        log.warn("Warning: Min Random Time has to be lower than Max Random Time! Set to defaults (" + timeMinDefault + ", " + timeMaxDefault + ")");
    }
    // TODO
}

function main(){
    if (initCron) performCron();
    randomTime ? randomCron() : staticCron();
}

main();
