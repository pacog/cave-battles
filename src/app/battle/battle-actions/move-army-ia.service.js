(function() {
    'use strict';

    angular.module('caveBattles.actions.move-army-ia', [
        'caveBattles.actions.move-army-ia-scheduled'
    ])
        .factory('MoveArmyIAAction', MoveArmyIAAction);

    function MoveArmyIAAction(MoveArmyIAActionScheduled) {

        var MoveArmyIAActionClass = function(params) {
            this.init(params);
        };

        MoveArmyIAActionClass.prototype = {
            init: init
        };

        return MoveArmyIAActionClass;

        function init(params) {
            this.ongoingEvents = [];
            this.scheduledEvents = [];
            if(params.originNode && params.destinationNode) {
                this.scheduledEvents.push(new MoveArmyIAActionScheduled({
                    originNode: params.originNode,
                    destinationNode: params.destinationNode,
                    scheduler: params.scheduler,
                    relatedOngoingEvents: this.ongoingEvents
                }));
            }
        }
    }

})();