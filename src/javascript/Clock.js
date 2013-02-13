var Clock = (function () {
    var ClockClass = function () {
        this.alarms = [];
        $('#ok').on('click', this.addAlarm.bind(this));
    };

    ClockClass.prototype = {
        setAlarmTimeout: function (alarm) {
            var timeToAlert = alarm.time.getTime() - Date.now();
            setTimeout(function () {
                alert(alarm.message);
            }, timeToAlert)
        },

        addAlarm: function () {
            var alarmTime = $('#time')[0].valueAsDate;
            var now = new Date();
            alarmTime.setDate(now.getDate());
            alarmTime.setMonth(now.getMonth());
            alarmTime.setYear(now.getYear());

            var alarm = {
                time: alarmTime,
                message: $('#message').val()
            };
            //this.alarms.push(alarm);
            this.setAlarmTimeout(alarm);
            this.showAlarm(alarm);
        },
        showAlarm: function(alarm){
            $('#alarms').append('<li>' + alarm.message + '</li>');
        }

    }
    return ClockClass;
})();
