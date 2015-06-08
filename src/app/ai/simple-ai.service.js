(function() {
    'use strict';

    angular.module('caveBattles.simple-ai', [
        'caveBattles.battle-actions-factory'
    ])
        .factory('SimpleAI', SimpleAIService);

    SimpleAIService.$inject = ['BattleEvents'];

    function SimpleAIService(BattleEvents) {
        var factory = {
            getNextAction: getNextAction
        };
        return factory;

        function getNextAction(player, nodes) {
            var currentBestAction = null;
            angular.forEach(nodes, function(node) {
                if(isNodeFromPlayer(node, player)) {
                    var candidateAction = getBestActionFromNode(node, nodes, player);
                    if(candidateAction && actionIsBest(candidateAction, currentBestAction)) {
                        currentBestAction = candidateAction;
                    }
                }
            });
            return currentBestAction;
        }

        function isNodeFromPlayer(node, player) {
            return node.currentOwner && (node.currentOwner === player);
        }

        function getBestActionFromNode(node, nodes, player) {
            var bestAction = null;
            angular.forEach(nodes, function(otherNode) {
                if(node.canReachNode(otherNode) && !isNodeFromPlayer(otherNode, player) && node.ownerStrength > 20) {
                    bestAction = getMoveAction(node, otherNode);
                }
            });
            return bestAction;
        }

        function actionIsBest(oneAction, otherAction) {
            return true;
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