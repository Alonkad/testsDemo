(function () {
    var clock;
    var seconds;

    Date.prototype.toTimeString = function () {
        var hour = this.getHours();
        var minutes = this.getMinutes();
        minutes = minutes > 9 ? minutes : "0" + minutes;
        return hour + ":" + minutes;

    }

    function updateClock() {
        if (clock) {
            var date = new Date;
            var value = date.toTimeString();
            clock.innerText = value;
            var secAsPercentage = ((date.getSeconds() * 1000 + date.getMilliseconds()) / 600).toFixed(1);
            seconds.style.width =  secAsPercentage + "%" ;
        } else {
            clock = document.getElementById('clock');
            seconds = document.getElementById('seconds');
        }
    }

    setInterval(updateClock, 100);
})();