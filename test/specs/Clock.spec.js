describe('Clock tests demo', function () {
    var veryLongTime = 5 * 365 * 24 * 60 * 60;
    beforeEach(function () {
        this.view = {};
        this.view.message = $('#message')[0];
        this.view.time = $('#time')[0];
        this.view.ok = $('#ok')[0];

        this.view.message.value = '';
        this.view.time.value = null;
        $('#alarms').empty();


        this.setAlarm = function (message, msFromNow) {
            this.view.message.value = message;
            this.view.time.valueAsDate = new Date(Date.now() + msFromNow);
            this.view.ok.click();
        }
    });

    describe('acceptance', function () {
        beforeEach(function () {
            spyOn(window, 'alert');
            jasmine.Clock.useMock();
            jasmine.Clock.tick(veryLongTime);
        })

        it('should set alarms and alert the user with the alarm message at the alarm time', function () {
            this.setAlarm("test", 15);
            jasmine.Clock.tick(5);

            expect(alert).not.toHaveBeenCalled();

            jasmine.Clock.tick(15);
            expect(alert).toHaveBeenCalledWith('test');

        });
    });

    describe('basic functionality', function () {
        describe('when the ok button is clicked', function () {

            beforeEach(function () {
                spyOn(window, 'alert');
                jasmine.Clock.useMock();
                jasmine.Clock.tick(veryLongTime);
            })

            describe('if the message is NOT set', function () {
                it('should alert the user', function () {
                    this.view.time.valueAsDate = new Date(Date.now() + 10);

                    this.view.ok.click();

                    expect(window.alert).toHaveBeenCalledWith('Invalid input');
                });
            });

            describe('if the time is NOT set', function () {
                it('should alert the user', function () {
                    this.view.message.value = "no time input";

                    this.view.ok.click();

                    expect(window.alert).toHaveBeenCalledWith('Invalid input');
                });
            });

        });

        describe('when the alarm time is in the past', function () {
            var pastDueAlarm = -1000;

            beforeEach(function () {
                spyOn(window, 'alert');
                jasmine.Clock.useMock();
                jasmine.Clock.tick(veryLongTime);
            })

            it('should not add the alarm to the list of alarms', function () {

                var initialNumberOfAlarm = $('#alarms li').length;

                this.setAlarm("past due alarm", pastDueAlarm);

                var afterPastDueAlarmWasAdded = $('#alarms li').length;
                expect(afterPastDueAlarmWasAdded).toBe(initialNumberOfAlarm);
            });

            it('should not alert the user with this alarm in the future', function () {
                this.setAlarm("past due alarm", pastDueAlarm);

                jasmine.Clock.tick(veryLongTime);

                expect(alert).not.toHaveBeenCalledWith("past due alarm");
            });
        });

        describe('when the time is set to future time', function () {
            var futureAlarmTime = 1000;

            beforeEach(function () {
                spyOn(window, 'alert');
                jasmine.Clock.useMock();
                jasmine.Clock.tick(veryLongTime);
            })

            it('should not alert the user with the alarm message before the alarm time', function () {

                this.setAlarm("future alarm test", futureAlarmTime);

                jasmine.Clock.tick(900);
                expect(alert).not.toHaveBeenCalled();
                jasmine.Clock.tick(150);
                expect(alert).toHaveBeenCalledWith("future alarm test");
            });

            it('should add the alert to the current alarms list', function () {

                this.setAlarm("future alarm list test", futureAlarmTime);
                var alarm = $('#alarms li').last();

                expect(alarm.html()).toBe("future alarm list test");
            })

            it('should remove the alarm from the alarms list after it occurs', function () {

                this.setAlarm("future alarm list test", futureAlarmTime);
                var alarm = $('#alarms li').last();
                jasmine.Clock.tick(1100);

                expect($('#alarms').find(alarm).length).toBe(0);
            })
        });

        describe('when an alarm is clicked', function () {

            var testAlarmItem;
            var futureAlarmTime = 1000;

            beforeEach(function () {
                spyOn(window, 'alert');
                jasmine.Clock.useMock();
                jasmine.Clock.tick(veryLongTime);
            });

            it('should remove alarm from alarms list', function () {
                this.setAlarm("remove alarm test", futureAlarmTime);

                testAlarmItem = $('#alarms li').last();
                testAlarmItem.click();

                expect($('#alarms').find(testAlarmItem).length).toBe(0);
            });

            it('should cause the alarm not to alert when it is time for it', function () {
                this.setAlarm("remove alarm test", futureAlarmTime);
                testAlarmItem = $('#alarms li').last();

                testAlarmItem.click();
                jasmine.Clock.tick(1100);

                expect(alert).not.toHaveBeenCalledWith("remove alarm test");
            })
        });

        describe('when more than one alarm is set', function () {
            it('should show the alarms in the right order', function () {
                var callsToAlert = [];
                jasmine.Clock.useMock();
                spyOn(window, 'alert').andCallFake(function (message) {
                    callsToAlert.push(message);
                });

                this.setAlarm("second test to alert", 5000);
                this.setAlarm("first test to alert", 3000);

                jasmine.Clock.tick(5500);
                expect(callsToAlert).toEqual(["first test to alert", "second test to alert"  ])

//                jasmine.Clock.tick(3500);
//                expect(alert).toHaveBeenCalledWith("first test");
//                expect(alert).not.toHaveBeenCalledWith("second test");
//                jasmine.Clock.tick(2000);
//                expect(alert).toHaveBeenCalledWith("second test");

//                jasmine.Clock.tick(6000);
//                expect(alert.callCount).toBe(2);
//                expect(alert.calls[0].args[0]).toBe("first test");
//                expect(alert.calls[1].args[0]).toBe("second test");

            })

        });
    });
});