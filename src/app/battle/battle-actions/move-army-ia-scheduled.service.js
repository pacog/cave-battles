(function() {
    'use strict';

    angular.module('caveBattles.actions.move-army-ia-scheduled', [
        'caveBattles.utils.timer',
        'caveBattles.battle-events',
        'caveBattles.battle-model'
    ])
        .factory('MoveArmyIAActionScheduled', MoveArmyIAActionScheduled);

    function MoveArmyIAActionScheduled(Timer, BattleEvents, BattleModel) {

        var MoveArmyIAActionScheduledClass = function(params) {
            this.init(params);
        };

        MoveArmyIAActionScheduledClass.prototype = {
            init: init,
            execute: execute
        };

        return MoveArmyIAActionScheduledClass;

        function init(params) {
            this.relatedOngoingEvents = params.relatedOngoingEvents;
            this.army = params.army;
            this.scheduledFor = Timer.getTime();
            this.destinationNode = params.destinationNode;
            this.originNode = params.originNode;
            this.scheduler = params.scheduler;
        }

        function execute() {
            var eventToHandleForceMovement = BattleModel.moveForcesBetweenNodesAndGetRelatedEvent(this.originNode, this.destinationNode);
            if(eventToHandleForceMovement) {
                this.scheduler.addEvent(BattleEvents.MOVE_ARMY, eventToHandleForceMovement);
            }
        }
    }
})();