describe('View integration tests', function () {
    var iframeWindow,
        $,
        $msgInput,
        $timeInput,
        $addBtn,
        $alarmsList,
        originalAlert;

    beforeEach(function (){
        iframeWindow = document.getElementById('iframe').contentWindow;
        $ = iframeWindow.$;
        $msgInput = $('#message');
        $timeInput = $('#time');
        $addBtn = $('#ok');
        $alarmsList = $('#alarms');
        originalAlert = iframeWindow.alert;
        iframeWindow.alert = function (){};  //Fix jasmine 2.0.0-rc bug: spy on alert still calls original function
        spyOn(iframeWindow, 'alert');
    });

    afterEach(function (){
        $msgInput.val('');
        $timeInput.val('');
        $alarmsList.find('li').each(function(index, elm, c){
            $(elm).click();
        });
        iframeWindow.alert = originalAlert;
    });

    describe('when an alarm is added', function () {

        it('should be added to the alarms list', function () {
            $msgInput.val('alarm message');
            $timeInput.val('12:12');

            $addBtn.click();

            expect($alarmsList.children().length).toBe(1);
        });

        it('should fire an alert with the alarm message', function (done) {
            var alarmTime = new Date(Date.now() + 1000);
            var alarmMsg = 'alarm message';
            $msgInput.val(alarmMsg);
            $timeInput[0].valueAsDate = alarmTime;

            $addBtn.click();

            setTimeout(function (){
                expect(iframeWindow.alert).toHaveBeenCalledWith(alarmMsg);
                done();
            }, 1100);
        });
    });

    describe('when an alarm is clicked on', function () {
        it('should be removed from the alarms list', function () {
            $msgInput.val('alarm message');
            $timeInput.val('12:12');
            $addBtn.click();
            $addBtn.click();

            $alarmsList.find('li').eq(0).click();

            expect($alarmsList.children().length).toBe(1);
        });
    });
});