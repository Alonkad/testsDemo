describe("Clock integration", function () {
    'use strict';
    beforeEach(function () {
        var viewFrame = document.getElementById('view');
        this.view = viewFrame.contentDocument;
        this.window = viewFrame.contentWindow;

        spyOn(this.window, 'alert');

        this.userAddAlarm = function (alarmMessage, alarmTime) {
            this.addAlarmView.message.value = alarmMessage;
            this.addAlarmView.time.valueAsDate = alarmTime;

            this.addAlarmView.ok.click();
        }
    });
    afterEach(function () {
        this.window.$('input[type!=button]').val('');
        this.window.$('#alarms').empty();
    });
    beforeEach(function () {
        this.addMatchers({
            toIncludeAlarm: function (message, time) {
                this.message = function () {
                    return 'no item with the message: ' + message;// + ' and time ' + time;
                }
                var expectedItem = '<li>' + message + '</li>';

                return this.actual.innerHTML.indexOf(expectedItem) >= 0;
            }
        })
    });


    describe('when the user adds a new alarm', function () {
        beforeEach(function () {
            this.addAlarmView = {
                message: this.view.getElementById('message'),
                ok: this.view.getElementById('ok'),
                time: this.view.getElementById('time')
            };
            this.alarmsList = this.view.getElementById('alarms');
        });

        it('should be added to the alarms list', function () {
            var alarmMessage = 'a new alarm message';
            var alarmTime = new Date();
            this.userAddAlarm(alarmMessage, alarmTime);
            expect(this.alarmsList).toIncludeAlarm(alarmMessage, alarmTime);
        });

        describe('when the alarm time arrives', function () {
            it('should alert the alarm message', function () {
                var self = this;
                var alarmMessage = 'a new alarm message';
                var alarmTime = new Date(Date.now() + 10);

                this.userAddAlarm(alarmMessage, alarmTime);

                waitsFor(function(){
                    if (self.window.alert.callCount > 0) {
                        expect(self.window.alert).toHaveBeenCalledWith(alarmMessage);
                        return true;
                    }
                }, 'alert to be called', 20);
            });

            it('should not alert for removed alarms', function () {
                this.fail('test not implemented');
            });
        })

    });


    describe('when the user clicks on an existing alarm', function () {
        it('should be removed from the list', function () {
            this.fail('test not implemented');
        });
    });
});
