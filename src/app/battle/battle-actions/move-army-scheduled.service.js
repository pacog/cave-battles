(function() {
    'use strict';
    angular.module('caveBattles.actions.move-army-scheduled', [
        'caveBattles.utils.timer'
    ])
        .factory('MoveArmyActionScheduled', MoveArmyActionScheduled);

    function MoveArmyActionScheduled(Timer) {

        var MoveArmyActionScheduledClass = function(params) {
            this.init(params);
        };

        MoveArmyActionScheduledClass.prototype = {
            init: init,
            execute: execute
        };

        return MoveArmyActionScheduledClass;

        function init(params) {
            this.relatedOngoingEvents = params.relatedOngoingEvents;
            this.army = params.army;
            this.scheduledFor = Timer.getTime() + this.army.timeToGetToDestination(params.destinationNode)*1000;
            this.destinationNode = params.destinationNode;
        }

        function execute() {
            this.destinationNode.handleArmyArriving(this.army);
        }
    }
})();