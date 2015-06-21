'use strict';
(function() {
    angular.module('caveBattles.battle-actions-factory', [
        'caveBattles.battle-events',
        'caveBattles.actions.move-army',
        'caveBattles.actions.fill-nodes',
        'caveBattles.actions.plan-ia',
        'caveBattles.actions.move-army-ia'
    ])

    .factory('BattleActionsFactory', BattleActionsFactory);

    function BattleActionsFactory(BattleEvents, MoveArmyAction, FillNodesAction, PlanAIAction, MoveArmyIAAction) {

        var factory = {
            getAction: getAction
        };

        return factory;

        function getAction(action, params) {
            switch(action) {
                case BattleEvents.MOVE_ARMY:
                    return new MoveArmyAction(params);
                case BattleEvents.FILL_NODES:
                    return new FillNodesAction(params);
                case BattleEvents.PLAN_AI:
                    return new PlanAIAction(params);
                case BattleEvents.MOVE_ARMY_IA:
                    return new MoveArmyIAAction(params);
                default:
                    break;
            }
        }
    }
})();