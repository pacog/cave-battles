(function() {
    'use strict';

    angular.module('caveBattles.not-so-simple-ai', [
        'caveBattles.battle-actions-factory',
        'caveBattles.battle-events',
        'caveBattles.battle.constants'
    ])
        .factory('NotSoSimpleAI', NotSoSimpleAIService);

    NotSoSimpleAIService.$inject = ['BattleEvents', 'DEFAULT_NODE_STRENGTH'];

    function NotSoSimpleAIService(BattleEvents, DEFAULT_NODE_STRENGTH) {
        var factory = {
            name: 'Not So Simple AI',
            getNextAction: getNextAction
        };
        return factory;

        function getNextAction(player, nodes) {
            var possibleActions = getAllPossibleActions(nodes, player);
            var bestAction = selectActionFromPossibleActions(possibleActions);
            if(bestAction) {
                return bestAction.action;
            } else {
                return undefined;
            }
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
            if(possibleActions.length > 0) {
                var bestAction = possibleActions[0];
                for(var i=1; i< possibleActions.length; i++) {
                    if(possibleActions[i].goodness > bestAction.goodness) {
                        bestAction = possibleActions[i];
                    }
                }
                if(bestAction.goodness > 0) {
                    return bestAction;
                }
            }
            return undefined;
        }

        function getAllActionsFromNode(node, nodes, player) {
            var allActions = [];

            angular.forEach(nodes, function(otherNode) {
                if(node.canReachNode(otherNode) && node.ownerStrength > DEFAULT_NODE_STRENGTH) {
                    allActions.push({
                        goodness: getGoodnessOfMove(node, otherNode, player, nodes),
                        action: getMoveAction(node, otherNode)
                    });
                }
            });

            return allActions;
        }

        function getGoodnessOfMove(originNode, destinationNode, player, nodes) {
            var result = 0;
            if(destinationNode.isEmpty()) {
                //destinationNode is empty
                if(destinationNode.canBeConqueredWithForce(player, originNode.ownerStrength)) {
                    if(originNode.getEnemiesAround(player, nodes)) {
                        if(originNode.ownerStrength > 3*DEFAULT_NODE_STRENGTH) {
                            result = 70;
                        } else {
                            result = -50;
                        }
                    } else {
                        result = 100;
                    }
                } else {
                    result = -100;
                }
            } else if(destinationNode.belongsToPlayer(player)) {
                //destinationNode is own node
                if(originNode.isFull() && !destinationNode.isFull()) {
                    result = 200;
                }
                if(!originNode.getEnemiesAround(player, nodes) && destinationNode.getEnemiesAround(player, nodes)) {
                    result = 30;
                }
                if(!originNode.getEmptyNodesAround(nodes) && destinationNode.getEmptyNodesAround(nodes)) {
                    result = 20;
                }
                //TODO: take into account armies going
            } else {
                //destinationNode is enemy
                if(destinationNode.canBeConqueredWithForce(player, originNode.ownerStrength)) {
                    result = 50;
                } else {
                    result = -200;
                }
            }
            return result;
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