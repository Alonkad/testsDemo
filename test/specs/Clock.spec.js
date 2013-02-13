describe("Clock integration", function () {
    beforeEach(function(){
        this.view = document.getElementById('view').contentDocument;
    });

    describe('when the user adds a new alarm', function () {
        beforeEach(function(){
           this.addAlarmView = {
               message: this.view.getElementById('message'),
               ok: this.view.getElementById('ok'),
               time: this.view.getElementById('time')
           };
            this.alarmsList = this.view.getElementById('alarms');
        });

        it('should be added to the alarms list', function () {
            var alarmMessage = 'a new alarm message';
            var alarmDate = new Date();
            this.addAlarmView.message.value = alarmMessage;
            this.addAlarmView.time.valueAsDate = alarmDate;

            this.addAlarmView.ok.click();

            expect(this.alarmsList.innerHTML).toEqual('')

        });

        describe('when the alarm time arrives', function () {
            it('should alert the alarm message', function () {
                this.fail('test not implemented');
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