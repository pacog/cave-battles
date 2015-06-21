(function() {
    'use strict';

    angular.module('caveBattles.actions.move-army', [
        'caveBattles.actions.move-army-ongoing',
        'caveBattles.actions.move-army-scheduled'
    ])
        .factory('MoveArmyAction', MoveArmyAction);

    function MoveArmyAction(MoveArmyActionOnGoing, MoveArmyActionScheduled) {

        var MoveArmyActionClass = function(params) {
            this.init(params);
        };

        MoveArmyActionClass.prototype = {
            init: init
        };

        return MoveArmyActionClass;

        function init(params) {
            this.ongoingEvents = [];
            this.scheduledEvents = [];
            if(params.army && params.army.force) {
                this.ongoingEvents.push(new MoveArmyActionOnGoing({
                    army: params.army,
                    destinationNode: params.destinationNode
                }));
                this.scheduledEvents.push(new MoveArmyActionScheduled({
                    army: params.army,
                    destinationNode: params.destinationNode,
                    relatedOngoingEvents: this.ongoingEvents
                }));
            }
        }
    }

})();