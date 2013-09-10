describe('Clock', function () {
    var clock;

    function getUserTimeString(minuteOffset){
        minuteOffset = minuteOffset || 1;
        var time = new Date(Date.now() + minuteOffset*60000);
        var hours = time.getHours().toString();
        var minutes = time.getMinutes().toString();
        hours = (hours.length == 2) ? hours : ('0' + hours);
        minutes = (minutes.length == 2) ? minutes : ('0' + minutes);
        return (hours + ':' + minutes);
    }

    beforeEach(function () {
        clock = new Clock();
    });


    describe('when an alarm is added', function () {

        it('should be added to alarms array', function (){
            var alarm = {
                time: getUserTimeString(1),
                msg: 'alarm message'
            };
            spyOn(clock, 'emit');

            clock.addAlarm(alarm.time, alarm.msg);

            var args = clock.emit.calls.first().args;
            expect(args[0]).toEqual(clock.events.alarmAdded);
        });

        it('should fire event when alarm is executed', function (){
            var alarm = {
                time: getUserTimeString(1),
                msg: 'alarm message'
            };
            var mockClock = jasmine.getEnv().clock;
            mockClock.install();
            spyOn(clock, 'emit');
            clock.addAlarm(alarm.time, alarm.msg);

            mockClock.tick(60000);

            var args = clock.emit.calls.argsFor(1);
            expect(args[0]).toEqual(clock.events.alarmExecute);
            expect(args[1].msg).toEqual(alarm.msg);
        });
    });


    describe('when an alarm is removed', function () {

        it('should be removed from alarms array', function (){
            var alarm = {
                time: getUserTimeString(1),
                msg: 'alarm message'
            };
            spyOn(clock, 'emit');
            clock.addAlarm(alarm.time, alarm.msg);

            clock.removeAlarm(alarm.time, alarm.msg);

            var args = clock.emit.calls.argsFor(1);
            expect(args[0]).toEqual(clock.events.alarmRemoved);
            expect(args[1].msg).toEqual(alarm.msg);
        });
    });
});