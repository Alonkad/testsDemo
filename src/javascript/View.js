function View(clock, $) {
    var $msgInput,
        $timeInput,
        $addBtn,
        $alarmsList;

    (function init(){
        cacheDomElements();
        bindDomEvents();
        registerEvents();
    })();

    function cacheDomElements(){
        $msgInput = $('#message');
        $timeInput = $('#time');
        $addBtn = $('#ok');
        $alarmsList = $('#alarms');
    }


    function bindDomEvents() {
        $addBtn.on('click', function (){
            var msg = $('#message').val();
            var time = $('#time').val();

            clock.addAlarm(time, msg);
        });

        $alarmsList.on('click', 'li', function (){
            var $this = $(this);
            var alarmTime = $this.attr('data-time');
            var alarmMsg = $this.attr('data-msg');
            clock.removeAlarm(alarmTime, alarmMsg);
        });
    }

    function registerEvents(){
        clock.on(clock.events.alarmAdded, onAlarmAdded);
        clock.on(clock.events.alarmRemoved, onAlarmRemoved);
        clock.on(clock.events.alarmExecute, onAlarmExecuted);
    }

    function onAlarmAdded(alarmObj) {
        var $newAlarmElm = $('<li id="alarm' + alarmObj.timeOutId + '" data-time="' + alarmObj.time + '" data-msg="' + alarmObj.msg + '">' + alarmObj.time + ' : ' +  alarmObj.msg + '</li>')
        $newAlarmElm.appendTo($alarmsList);
    }

    function onAlarmRemoved(alarmObj) {
        var alarmsElements = $alarmsList.children(),
            $elm,
            alarmTime,
            alarmMsg,
            elmId;

        for(var i=0 ; i < alarmsElements.length ; i++) {
            $elm = $(alarmsElements[i]);
            alarmTime = $elm.attr('data-time');
            alarmMsg = $elm.attr('data-msg');
            elmId = $elm.attr('id');

            if(alarmObj.time == alarmTime && alarmObj.msg == alarmMsg && ('alarm' + alarmObj.timeOutId) == elmId) {
                $elm.remove();
            }
        }
    }

    function onAlarmExecuted(alarmObj) {
        window.alert(alarmObj.msg);
    }
}


