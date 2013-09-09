describe('View integration tests', function () {
    describe('when an alarm is added', function () {
        it('should be added to clock', function () {
            expect('test').toBe('implemented');
        });

        describe('when the alarm time is due', function () {
            it('should fire an alert with the alarm message', function () {
                expect('test').toBe('slow');
            });
        });
    });

    describe('when an alarm is clicked on', function () {
        it('should be removed from the alarms list', function () {
            expect('test').toBe('implemented');
        });
    });
});