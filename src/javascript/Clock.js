var Clock = (function () {
    var ClockClass = function () {
        $('#ok').click(this.onOkClick);
    };

    ClockClass.prototype = {
        onOkClick: function () {
            var submittedMessage = $('#message').val();
            var submitterTime = $('#time')[0].valueAsNumber;
            if (!submittedMessage || !submitterTime) {
                alert('Invalid input');
                return;
            }

            var now = new Date();
            var alarmDate = new Date(submitterTime);
            alarmDate.setUTCFullYear(now.getUTCFullYear());
            alarmDate.setUTCMonth(now.getUTCMonth());
            alarmDate.setUTCDate(now.getUTCDate());
            var msLeftToAlarm = alarmDate.getTime() - now.getTime();
            if (msLeftToAlarm <= 0) return;

            var alarmsList = $('#alarms');
            alarmsList.append('<li>' + submittedMessage + '</li>');
            var currentAlarm = alarmsList.find('li:last');

            var alarmTimeOut = setTimeout(function () {
                alert(submittedMessage);
                currentAlarm.remove();
            }, msLeftToAlarm);

            currentAlarm.click(function () {
                clearTimeout(alarmTimeOut);
                currentAlarm.remove();
            });
        }
    };
    return ClockClass;
})();
