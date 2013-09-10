describe('EventDispatcher', function () {
    var dispatcher;
    var handler;

    beforeEach(function () {
        dispatcher = new EventDispatcher();
        handler = jasmine.createSpy();
    });

    describe('when an event is emitted', function () {
        describe('added handlers', function () {
            it('should be called with the event data', function () {
                dispatcher.on('event', handler);

                dispatcher.emit('event','event data');

                expect(handler).toHaveBeenCalledWith('event data');
            });

            it('should not be called more then once', function () {
                dispatcher.on('event', handler);
                dispatcher.on('event', handler);

                dispatcher.emit('event');

                expect(handler.calls.count()).toBe(1);
            })
        });

        describe('removed handlers', function () {
            it('should not be called', function () {
                dispatcher.on('event', handler);

                dispatcher.removeListener('event', handler);
                dispatcher.emit('event');

                expect(handler).not.toHaveBeenCalled();
            });

        })
    });
});