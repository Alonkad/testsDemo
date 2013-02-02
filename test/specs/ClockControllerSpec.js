describe("Clock controller", function(){
    describe("when the user adds a new alarm", function(){
        it("An alarm should be added to controller.clock", function(){
            this.controller = new ClockController();
            var addedAlarm = new Date("Thu Jan 01 1970 14:22:00 GMT+0200 (IST)");

            this.controller.addAlarm(addedAlarm);

            expect(this.controller._clock._alarms).toEqual([addedAlarm]);
        })
    });
});