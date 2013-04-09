describe('Clock tests demo', function () {
    var $;

    beforeEach(function () {
        var iframe = document.getElementById('view');
        this.viewWindow = iframe.contentWindow;
        $ = this.viewWindow.$;

        this.view = {};
        this.view.message = $('#message')[0];
        this.view.time = $('#time')[0];
        this.view.ok = $('#ok')[0];

        this.view.message.value = '';
        this.view.time.value = null;

    });


    describe('acceptance', function () {
        it('should set alarms and alert the user with the alarm message at the alarm time', function () {
            spyOn(this.viewWindow, 'alert');

            this.view.message.value = "test";
            this.view.time.valueAsDate = new Date(Date.now() + 1);
            this.view.ok.click();

            expect(this.viewWindow.alert).not.toHaveBeenCalled();
            waitsFor(function () {
                return this.viewWindow.alert.callCount;
            }, 'alert to be called', 20);
            runs(function () {
                expect(this.viewWindow.alert).toHaveBeenCalledWith('test');
            });
        });
    });

    describe('basic functionality', function () {
        describe('when the ok button is clicked', function () {
            describe('if the message or time are NOT set', function () {
                it('should alert the user', function () {
                    spyOn(this.viewWindow, 'alert');

                    this.view.ok.click();

                    expect(this.viewWindow.alert).toHaveBeenCalledWith('Invalid input');
                });
            });
        });
        describe('when the time is set to future time', function () {
            it('should not alert the user with the alarm message before the alarm time', function () {
                jasmine.Clock.useMock();
                spyOn(this.viewWindow, 'alert');
                var testMessage = "future alarm test";

                this.view.message.value = testMessage;
                this.view.time.valueAsDate = new Date(Date.now() + 1000);
                this.view.ok.click();

                jasmine.Clock.tick(999);
                expect(this.viewWindow.alert).not.toHaveBeenCalled();
                jasmine.Clock.tick(1);
                expect(this.viewWindow.alert).toHaveBeenCalledWith(testMessage);
            });
        });
    });
});