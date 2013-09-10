function EventDispatcher() {

}

EventDispatcher.prototype = {
    on: function (event, handler) {
        this._eventListeners = this._eventListeners || {};
        this._eventListeners[event] = this._eventListeners[event] || [];
        if (this._eventListeners[event].indexOf(handler) < 0) {
            this._eventListeners[event].push(handler);
        }
    },

    removeListener: function (event, handler) {
        if (this._eventListeners && this._eventListeners[event]) {
            this._eventListeners[event] = _.without(this._eventListeners[event], handler);
        }
    },

    emit: function(event, args) {
        var listeners = this._eventListeners && this._eventListeners[event];
        if (listeners) {
            var eventArgs = _.tail(arguments);
            _.each(listeners, function(handler) {
                handler.apply(this, eventArgs);
            });
        }
    }

};