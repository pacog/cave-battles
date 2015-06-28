(function() {
    'use strict';

    angular.module('caveBattles.actions.fill-nodes-scheduled', [
        'caveBattles.utils.timer',
        'caveBattles.battle-model',
        'caveBattles.battle-events'
    ])
        .factory('FillNodesActionScheduled', FillNodesActionScheduled);

    function FillNodesActionScheduled(Timer, BattleModel, BattleEvents) {

        var FillNodesActionScheduledClass = function(params) {
            this.init(params);
        };

        FillNodesActionScheduledClass.prototype = {
            init: init,
            execute: execute
        };

        return FillNodesActionScheduledClass;

        function init(params) {
            this.relatedOngoingEvents = params.relatedOngoingEvents;
            this.scheduler = params.scheduler;
            this.scheduledFor = params.scheduledFor || Timer.getTime();
            this.repeatEvery = params.repeatEvery;
        }

        function execute() {
            angular.forEach(BattleModel.model.nodes, function(node) {
                node.fillNode();
            });

            this.scheduler.addEvent(BattleEvents.FILL_NODES, {
                scheduler: this.scheduler,
                repeatEvery: this.repeatEvery,
                scheduledFor: Timer.getTime() + this.repeatEvery
            });
        }
    }
})();