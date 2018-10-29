"use strict";

// ========================= //
// = Copyright (c) NullDev = //
// ========================= //

let getDate = function(){
    const date = new Date();
    let hour = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();

    hour = (hour < 10 ? "0" : "") + hour;
    min = (min  < 10 ? "0" : "") + min;
    sec = (sec  < 10 ? "0" : "") + sec;

    return "[" + hour + ":" + min + ":" + sec + "]";
};

module.exports = {
    error: function(input){
        console.log(" \x1b[41m\x1b[30m x \x1b[0m\x1b[31m [ERROR] " + getDate() + " - " + input + "\x1b[0m");
    },

    warn: function(input){
        console.log(" \x1b[43m\x1b[30m ! \x1b[0m\x1b[33m [WARN]  " + getDate() + " - " + input + "\x1b[0m");
    },

    info: function(input){
        console.log(" \x1b[44m\x1b[30m i \x1b[0m\x1b[36m [INFO]  " + getDate() + " - " + input + "\x1b[0m");
    },

    done: function(input){
        console.log(" \x1b[42m\x1b[30m ✓ \x1b[0m\x1b[32m [DONE]  " + getDate() + " - " + input + "\x1b[0m");
    }
};
