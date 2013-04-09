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

                setTimeout(function(){
                    alert($('#message').val());
                }, msLeftToAlarm);
            } else {
                alert('Invalid input');
            }
        }
    };
    return ClockClass;
})();
