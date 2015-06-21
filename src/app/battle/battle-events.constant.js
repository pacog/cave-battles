(function() {
    'use strict';
    angular.module('caveBattles.battle-events', [])
        .constant('BattleEvents', {
            // army, forceToTake (optional), destinationNode
            MOVE_ARMY: 'MOVE_ARMY',
            // list of all nodes
            FILL_NODES: 'FILL_NODES',
            // list of all nodes
            PLAN_AI: 'PLAN_AI',
            //TODO: use this event instead of MOVE_ARMY everywhere
            // originNode, destinatioNode
            MOVE_ARMY_IA: 'MOVE_ARMY_IA'
        });
})();