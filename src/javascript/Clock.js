var Clock = (function () {
    var ClockClass = function () {
        $('#ok').click(this.onOkClick);
    };

    ClockClass.prototype = {
        onOkClick: function () {
            if ($('#message').val() && $('#time').val()) {
                var msSinceMidnight = new Date().getTime() % (24 * 60 * 60 * 1000);
                var alarmTimeInMS = new Date($('#time')[0].valueAsNumber).getTime();
                var msLeftToAlarm = alarmTimeInMS - msSinceMidnight;

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
