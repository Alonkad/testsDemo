var Clock = (function () {
    var ClockClass = function () {
        this._alarms = [];
        this._timeoutId = null;
    };

    ClockClass.prototype = {

        addAlarm: function (time, callback) {
            this._alarms.push({
                time: time,
                callback: callback
            });
            this._setNextTimeout();
        },

        _updateAlarms: function () {
            var now = Date.now();
            this._alarms = this._alarms
                .filter(function (item) {
                    return item.time > now;
                })
                .sort(function (a, b) {
                    if (a.time === b.time) {
                        return 0;
                    }
                    return a.time < b.time ? -1 : 1;
                });
        },

        _setNextTimeout: function () {
            this._updateAlarms();
            if (this._timeoutId) {
                clearTimeout(this._timeoutId);
            }

            if (this._alarms.length > 0) {
                var nextAlarm = this._alarms[0];
                var delay = nextAlarm.time - Date.now();

                var self = this;
                this._timeoutId = setTimeout(function () {
                    nextAlarm.callback(nextAlarm.time);
                    self._setNextTimeout();
                }, delay);
            }
        }


    }

    return ClockClass;
})();
