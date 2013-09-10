var Clock = function () {
    this.alarmsArr = [];
    this.events = {
        alarmAdded: 'alarmAdded',
        alarmRemoved: 'alarmRemoved',
        alarmExecute: 'alarmExecute'
    };
};

Clock.prototype = _.extend(EventDispatcher.prototype, {

    addAlarm: function (time, message) {
        var alarmObj = {
            time: time,
            msg: message
        };

        var timeMS = this._convertTime(time);
        var timeToTigger = timeMS - Date.now();
        var that = this;

        //TODO: Maybe check if timeToTrigger is negative

        alarmObj.timeOutId = setTimeout(function (){
            that.emit(that.events.alarmExecute, alarmObj);
        }, timeToTigger);

        this.alarmsArr.push(alarmObj);
        this.emit(this.events.alarmAdded, alarmObj);
    },

    removeAlarm: function (time, message) {
        var alarmIndex = this._getAlarmIndex(time, message);
        if(alarmIndex < 0) {
            return;
        }

        var removedAlarm = this.alarmsArr.splice(alarmIndex, 1)[0];
        this.emit(this.events.alarmRemoved, removedAlarm);
    },

    _convertTime: function(userTime) {
        var splits = userTime.split(':');
        var time = new Date();
        time.setHours(splits[0]);
        time.setMinutes(splits[1]);
        time.setSeconds(splits[2] || 0);
        time.setMilliseconds(0);
        return time.getTime();
    },

    _getAlarmIndex: function(time, message) {
        var alarmIdex = -1,
            alarm;

        for(var i=0 ; i<this.alarmsArr.length ; i++) {
            alarm = this.alarmsArr[i];
            if(alarm.time == time && alarm.msg === message) {
                alarmIdex = i;
                break;
            }
        }

        return alarmIdex;
    }
});
