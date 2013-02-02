describe("Clock", function () {
    beforeEach(function () {
        this.clock = new Clock();
    });

    describe("when an alarm is added", function () {
        it("should add an item to the _alarms member", function () {
            var alarmTime = new Date();
            var callback = function () {
            };
            spyOn(Date, 'now').andReturn(alarmTime-5);

            this.clock.addAlarm(alarmTime, callback);

            expect(this.clock._alarms).toEqual([
                {
                    time: alarmTime,
                    callback: callback
                }
            ]);
        });

        it("should sort the alarms by time", function () {
            var firstAlarm = new Date("1.1.2000 12:12:00");
            var secondAlarm = new Date("1.1.2000 15:12:00");
            var thirdAlarm = new Date("1.1.2000 18:12:00");
            var callback = function () {
            };
            spyOn(Date, 'now').andReturn(new Date("1.1.2000 10:12:00"));

            this.clock.addAlarm(secondAlarm, callback);
            this.clock.addAlarm(firstAlarm, callback);
            this.clock.addAlarm(thirdAlarm, callback);

            expect(this.clock._alarms).toEqual([
                {
                    time: firstAlarm,
                    callback: callback
                },
                {
                    time: secondAlarm,
                    callback: callback
                },
                {
                    time: thirdAlarm,
                    callback: callback
                }
            ]);
        });

        it("should remove past due alarms from _alarms member", function(){
            var alarmTime = new Date("1.1.1970 10:00");
            var callback = function () {
            };

            this.clock.addAlarm(alarmTime, callback);

            expect(this.clock._alarms).toEqual([]);
        });
    });

    describe("once an alarm is set", function () {
        it("its callback should be executed at the defined time", function () {
            var callback = jasmine.createSpy();
            var alarmTime = new Date();
            alarmTime.setMilliseconds(alarmTime.getMilliseconds() + 2);

            this.clock.addAlarm(alarmTime, callback);

            waitsFor(function () {
                if (callback.wasCalled) {
                    expect(callback).toHaveBeenCalledWith(alarmTime);
                    return true;
                }
            }, "alarm callback to be executed", 5);
        });

        it("its callback should NOT be executed before the defined time", function () {
            var callback = jasmine.createSpy();
            var alarmTime = new Date();
            alarmTime.setMilliseconds(alarmTime.getMilliseconds() + 2);

            this.clock.addAlarm(alarmTime, callback);

            expect(callback).not.toHaveBeenCalled();
        });

        it("should call all alarms in the correct order", function(){
            var firstAlarm = new Date(2);
            var secondAlarm = new Date(4);
            var thirdAlarm = new Date(6);
            var callback = [
                jasmine.createSpy("first").andReturn("first"),
                jasmine.createSpy("second"),
                jasmine.createSpy("third")
            ]

            var now = spyOn(Date, 'now').andReturn(new Date(0));

            this.clock.addAlarm(secondAlarm, callback[1]);
            this.clock.addAlarm(firstAlarm, callback[0]);
            this.clock.addAlarm(thirdAlarm, callback[2]);

            waitsFor(function(){
                return callback[0].wasCalled;
            }, "first callback to be executed", 5);
            runs(function(){
                expect(callback[1]).not.toHaveBeenCalled();
                expect(callback[2]).not.toHaveBeenCalled();
                now.andReturn(2);
            });
            waitsFor(function(){
                return callback[1].wasCalled;
            }, "second callback to be executed", 5);
            runs(function(){
                expect(callback[2]).not.toHaveBeenCalled();
                now.andReturn(4);
            });
            waitsFor(function(){
                return callback[2].wasCalled;
            }, "third callback to be executed", 5);
        });
    });

});