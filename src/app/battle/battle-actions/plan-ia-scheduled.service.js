(function() {
    'use strict';

    angular.module('caveBattles.actions.plan-ia-scheduled', [
        'caveBattles.utils.timer',
        'caveBattles.simple-ai',
        'caveBattles.battle-model',
        'caveBattles.battle-events'
    ])
        .factory('PlanAIActionScheduled', PlanAIActionScheduled);

    function PlanAIActionScheduled(Timer, BattleModel, SimpleAI, BattleEvents) {

        var PlanAIActionScheduledClass = function(params) {
            this.init(params);
        };

        PlanAIActionScheduledClass.prototype = {
            init: init,
            execute: execute
        };

        return PlanAIActionScheduledClass;

        function init(params) {
            this.relatedOngoingEvents = params.relatedOngoingEvents;
            this.scheduler = params.scheduler;
            this.scheduledFor = params.scheduledFor || Timer.getTime();
            this.repeatEvery = params.repeatEvery;
        }

        function execute() {
            var self = this;

            angular.forEach(BattleModel.model.players, function(player) {
                if(player.isAI()) {
                    var newAction = SimpleAI.getNextAction(player, BattleModel.model.nodes);
                    if(newAction) { //TODO: create empty action to avoid this if
                        newAction.params.scheduler = self.scheduler;
                        self.scheduler.addEvent(newAction.name, newAction.params);
                    }
                }
            });

            self.scheduler.addEvent(BattleEvents.PLAN_AI, {
                scheduler: self.scheduler,
                repeatEvery: self.repeatEvery,
                scheduledFor: Timer.getTime() + self.repeatEvery
            });
        }
    }
})();