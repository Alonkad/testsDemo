var Clock = (function () {
    var ClockClass = function () {
        $('#ok').click($.proxy(this.onOkClick,this));
    };


    ClockClass.prototype = {

        getAlarmInterval:function(time){
            var alertTime = time.valueAsDate;
            var currentTime = new Date();

            alertTime.setUTCDate(currentTime.getUTCDate());
            alertTime.setUTCMonth(currentTime.getUTCMonth());
            alertTime.setUTCFullYear(currentTime.getUTCFullYear());

            return alertTime.getTime() - currentTime.getTime();
        },

        onOkClick: function () {
            var message = $('#message').val();
            var time = $('#time')[0];
            if (message && time.valueAsDate) {

                var timeToAlarm = this.getAlarmInterval(time);

                if (timeToAlarm > 0) {

                    var newAlert = $("<li>").html(message).appendTo("#alarms");

                    var  timeoutId = setTimeout(function () {

                        alert(message);
                        newAlert.remove();

                    }, timeToAlarm);

                    newAlert.click(function(){
                        $(this).remove();
                        clearTimeout(timeoutId);
                    });




                }



            } else {
                alert('Invalid input');
            }
        }
    }
    return ClockClass;
})();
