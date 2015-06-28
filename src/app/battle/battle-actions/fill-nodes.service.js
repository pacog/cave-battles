(function() {
    'use strict';

    angular.module('caveBattles.actions.fill-nodes', [
        'caveBattles.actions.fill-nodes-scheduled'
    ])
        .factory('FillNodesAction', FillNodesAction);

    function FillNodesAction(FillNodesActionScheduled) {

        var FillNodesActionClass = function(params) {
            this.init(params);
        };

        FillNodesActionClass.prototype = {
            init: init
        };

        return FillNodesActionClass;

        function init(params) {
            this.ongoingEvents = [];
            this.scheduledEvents = [];

            this.scheduledEvents.push(new FillNodesActionScheduled({
                relatedOngoingEvents: this.ongoingEvents,
                scheduler: params.scheduler,
                repeatEvery: params.repeatEvery,
                scheduledFor: params.scheduledFor
            }));
        }
    }
})();