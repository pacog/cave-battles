(function() {
    'use strict';

    angular.module('caveBattles.totally-random-ai', [
        'caveBattles.battle-actions-factory',
        'caveBattles.battle-events'
    ])
        .factory('TotallyRandomAI', TotallyRandomAIService);

    TotallyRandomAIService.$inject = ['BattleEvents'];

    function TotallyRandomAIService(BattleEvents) {
        var factory = {
            name: 'Totally random AI',
            getNextAction: getNextAction
        };
        return factory;

        function getNextAction(player, nodes) {
            var possibleActions = getAllPossibleActions(nodes, player);

            return selectActionFromPossibleActions(possibleActions);
        }

        function getAllPossibleActions(nodes, player) {
            var possibleActions = [];

            angular.forEach(nodes, function(node) {
                if(isNodeFromPlayer(node, player)) {
                    possibleActions = possibleActions.concat(getAllActionsFromNode(node, nodes, player));
                }
            });

            return possibleActions;
        }

        function isNodeFromPlayer(node, player) {
            return node.currentOwner && (node.currentOwner === player);
        }

        function selectActionFromPossibleActions(possibleActions) {
            var index = 0;
            if(possibleActions.length > 1) {
                index = Math.floor(Math.random()*possibleActions.length);
            }
            return possibleActions[index];
        }

        function getAllActionsFromNode(node, nodes) {
            var allActions = [];

            angular.forEach(nodes, function(otherNode) {
                if(node.canReachNode(otherNode) && node.ownerStrength > 10) {
                    allActions.push(getMoveAction(node, otherNode));
                }
            });

            return allActions;
        }

        function getMoveAction(originNode, destinationNode) {
            return {
                name: BattleEvents.MOVE_ARMY_IA,
                params: {
                    originNode: originNode,
                    destinationNode: destinationNode
                }
            };
        }
    }

})();