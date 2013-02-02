var ClockController = (function(){
    function ClockControllerClass() {
        this._clock = new Clock();
    }

    ClockControllerClass.prototype = {
        constructor: ClockControllerClass,
        addAlarm: function(){

        }
    };

    return ClockControllerClass;
})();

