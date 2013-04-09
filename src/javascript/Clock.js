var Clock = (function () {
    var ClockClass = function () {
        $('#ok').click(this.onOkClick);
    };

    ClockClass.prototype = {
        onOkClick: function () {
            if ($('#message').val() && $('#time').val()) {
                var now = new Date();
                var alarmDate = new Date($('#time')[0].valueAsNumber);
                alarmDate.setUTCFullYear(now.getUTCFullYear());
                alarmDate.setUTCMonth(now.getUTCMonth());
                alarmDate.setUTCDate(now.getUTCDate());
                var msLeftToAlarm = alarmDate.getTime() - now.getTime();

                var alarmsList = $('#alarms');
                alarmsList.append('<li>' + $('#message').val() + '</li>');
                var currentAlarm = alarmsList.find('li:last');


                setTimeout(function(){
                    alert($('#message').val());
                    currentAlarm.remove();
                }, msLeftToAlarm);
            } else {
                alert('Invalid input');
            }
        }
    };
    return ClockClass;
})();
