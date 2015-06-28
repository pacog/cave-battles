(function() {
    'use strict';

    angular.module('caveBattles.actions.plan-ia', [
        'caveBattles.actions.plan-ia-scheduled'
    ])
        .factory('PlanAIAction', PlanAIAction);

    function PlanAIAction(PlanAIActionScheduled) {

        var PlanAIActionClass = function(params) {
            this.init(params);
        };

        PlanAIActionClass.prototype = {
            init: init
        };

        return PlanAIActionClass;

        function init(params) {
            this.ongoingEvents = [];
            this.scheduledEvents = [];

            this.scheduledEvents.push(new PlanAIActionScheduled({
                nodes: params.nodes,
                players: params.players,
                relatedOngoingEvents: this.ongoingEvents,
                scheduler: params.scheduler,
                repeatEvery: params.repeatEvery,
                scheduledFor: params.scheduledFor
            }));
        }
    }

})();