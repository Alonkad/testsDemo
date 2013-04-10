describe('Clock tests demo:', function () {
    beforeEach(function () {
        this.view = {};
        //this.view.alarms = $('#alarms')[0];
        this.view.message = $('#message')[0];
        this.view.time = $('#time')[0];
        this.view.ok = $('#ok')[0];


        jasmine.Clock.useMock();
        spyOn(window, 'alert');

        this.setAlarm = function (message, msTillAlarm) {
            this.view.message.value = message;
            this.view.time.valueAsDate = new Date(Date.now() + msTillAlarm);
            this.view.ok.click();
        };
    });

    afterEach(function () {
        this.view.message.value = '';
        this.view.time.value = null;
        $('ul#alarms').empty();
    });

    describe('acceptance', function () {
        it('should set alarms and alert the user with the alarm message at the alarm time', function () {
            this.setAlarm('test', 1000);

            expect(alert).not.toHaveBeenCalled();
            jasmine.Clock.tick(2000);
            expect(alert).toHaveBeenCalledWith('test');
        });
    });

    describe('basic functionality:', function () {
        describe('when the ok button is clicked', function () {
            describe('if the message is NOT set', function () {
                it('should alert the user', function () {
                    this.setAlarm('', 1000);

                    expect(alert).toHaveBeenCalledWith('Invalid input');
                });
            });
            describe('if the time is NOT set', function () {
                it('should alert the user', function () {
                    this.view.message.value = "message without time";
                    this.view.ok.click();

                    expect(alert).toHaveBeenCalledWith('Invalid input');
                });
            });
        });
        describe('when the time is set to future time', function () {
            it('should alert the user with a message when it\'s time', function () {//TODO wording
                var testMessage = "future alarm test";

                this.setAlarm(testMessage, 1000);

                jasmine.Clock.tick(900);
                expect(alert).not.toHaveBeenCalled();
                jasmine.Clock.tick(100);
                expect(alert).toHaveBeenCalledWith(testMessage);
            });
        });
        describe('when the time is set to the past', function () {
            it('should NOT alert the user with a message', function () {
                this.setAlarm('past alarm test', -1000);//todo put the -1000 in var ~'pasttime'

                jasmine.Clock.tick(2 * 365 * 24 * 60 * 60 * 1000);
                expect(alert).not.toHaveBeenCalled();
            });
        });
        describe('when an alarm is added', function () {
            it('should add an element to the current alarms', function () {//todo terminology, wording
                var numberOfAlarmsInAlarmsListBefore = $('#alarms').children().length;
                this.setAlarm('test', 1000);
                var numberOfAlarmsInAlarmsListAfter = $('#alarms').children().length;

                expect(numberOfAlarmsInAlarmsListAfter).toBe(numberOfAlarmsInAlarmsListBefore + 1);
            });
        });
        describe('when an alarm goes off', function () {        //todo refactor with previous test
            it('should remove the element from the current alarms', function () {     //todo terminology, wording
                this.setAlarm('when an alarn goes off', 7000);

                expect($('#alarms').children().length).toBe(1);
                jasmine.Clock.tick(7000);
                var numberOfAlarmsInAlarmsListAfter = $('#alarms').children().length;

                expect(numberOfAlarmsInAlarmsListAfter).toBe(0);
            });
        });
        describe('when an alarm item is clicked', function () {
            it('should be removed from the list', function () {  //todo terminology, wording
                this.setAlarm('when an alarm item is clicked (remove from dom)', 7000);
                var sampleLi = $('#alarms>li:first')[0];
                sampleLi.click();
                expect(sampleLi === $('#alarms>li:first')[0]).toBe(false);
            });
            //it('should remove the timeout', function () {

            //});
        });
        describe('when an alarm item is clicked', function () {
            beforeEach(function () {
                this.addMatchers({
                    toContainMessages: function (expected) {
                        var mismatches = [];

                        function itemHasExpectedMessage(item, index) {
                            if ($(item).html() === expected[index]) {
                                return true;
                            }
                            mismatches.push('[' + index + ']: actual is "' + $(item).html() + '", expected "' + expected[index] + '"');
                        }

                        this.message = function () {
                            return this.isNot ?
                                "Expected and actual are equal" :
                                mismatches.join(',');
                        };

                        if (this.actual.length !== expected.length) {
                            mismatches = ['actual contains ' + this.actual.length + ' items, expected ' + expected.length];
                            return false;
                        }

                        this.actual.toArray().forEach(itemHasExpectedMessage);
                        return mismatches.length === 0;
                    }
                })
            });

            it('should be removed from the list', function () {  //todo terminology, wording
                this.setAlarm('Alarm 0', 7000);
                this.setAlarm('Alarm 1', 7000);
                this.setAlarm('Alarm 2', 7000);
                this.setAlarm('Alarm 3', 7000);
                this.setAlarm('Alarm 4', 7000);
                var removedAlarm = $('#alarms>li')[2];

                removedAlarm.click();

                var updatedList = $('#alarms>li');
                expect(updatedList).toContainMessages(['Alarm 0', 'Alarm 1', 'Alarm 3', 'Alarm 4']);
            });
            //it('should remove the timeout', function () {

            //});
        });
    });

});

