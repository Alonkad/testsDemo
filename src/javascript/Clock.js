var Clock = (function () {
    var ClockClass = function () {
        $('#ok').click(this.onOkClick);
    };

    ClockClass.prototype = {
        onOkClick: function () {
            if ($('#message').val() && $('#time').val()) {
                var timeToAlarm = $('#time')[0].valueAsDate - Date.now();
                setTimeout(function(){
                    alert($('#message').val());
                }, timeToAlarm);
            } else {
                alert('Invalid input');
            }
        }
    }
    return ClockClass;
})();
