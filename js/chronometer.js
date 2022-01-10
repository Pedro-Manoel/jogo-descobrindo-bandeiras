"use strict";

class Chronometer {
    constructor (htmlElementId) {
        this.hour = 0;
        this.minute = 0;
        this.second = 0;
        this.millisecond = 0;
        this.cron = null;
        this.htmlElement = document.getElementById(htmlElementId);
    }

    start () {
        this.pause();
        this.cron = setInterval(() => { this.timer(); }, 10);
    }

    pause () {
        clearInterval(this.cron);
    }

    reset () {
        this.hour = 0;
        this.minute = 0;
        this.second = 0;
        this.millisecond = 0;
        this.htmlElement.innerHTML = '00:00:00';
    }

    timer () {
        if ((this.millisecond += 10) == 1000) {
          this.millisecond = 0;
          this.second++;
        }
        if (this.second == 60) {
          this.second = 0;
          this.minute++;
        }
        if (this.minute == 60) {
          this.minute = 0;
          this.hour++;
        }

        this.htmlElement.innerHTML = this.toString();
    }

    returnData (input) {
        return input >= 10 ? input : `0${input}`
    }

    toString () {
        return `${this.returnData(this.hour)}:${this.returnData(this.minute)}:${this.returnData(this.second)}`;
    }

    toInt () {
        return (this.hour * 3600) + (this.minute * 60) + this.second
    }
}
