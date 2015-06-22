'use strict';
(function() {
    angular.module('caveBattles.battle-handler', [
        'caveBattles.battle-scheduler',
        'caveBattles.battle.constants',
        'caveBattles.battle-model',
        'caveBattles.battle-events'
    ])
        .service('BattleHandler', BattleHandler);

    BattleHandler.$inject = ['BattleScheduler', 'BattleEvents', 'FILL_NODES_EVERY', 'PLAN_AI_EVERY', 'BattleModel'];

    function BattleHandler(BattleScheduler, BattleEvents, FILL_NODES_EVERY, PLAN_AI_EVERY, BattleModel) {

        var options;
        var currentlySelectedNode = null;

        var publicInterface = {
            init: init,
            requestSelection: requestSelection,
            hasEnded: hasEnded,
            update: update,
            requestNodeForcesToGoToNode: requestNodeForcesToGoToNode,
            removeCurrentSelection: removeCurrentSelection
        };

        return publicInterface;

        function init(battleOptions, playerOptions) {
            options = angular.copy(battleOptions);
            options.map.players = playerOptions;
            BattleModel.init(options);
            initRecurringEvents();
        }

        function initRecurringEvents() {
            BattleScheduler.addRecurringEvent(BattleEvents.FILL_NODES, {}, FILL_NODES_EVERY);
            BattleScheduler.addRecurringEvent(BattleEvents.PLAN_AI, {
                scheduler: BattleScheduler
            }, PLAN_AI_EVERY);
        }

        function update() {
            BattleModel.cleanDeletedArmies();
            BattleScheduler.updateBattleInfo(publicInterface);
        }

        function requestSelection(node) {
            removeCurrentSelection();
            if(!node.selected) {
                if(node.currentOwner && node.currentOwner.isHuman()) {
                    currentlySelectedNode = node;
                    node.selected = true;
                }
            }
            selectionHasChanged();
        }

        function removeCurrentSelection() {
            if(currentlySelectedNode) {
                currentlySelectedNode.selected = false;
            }
            currentlySelectedNode = null;
            selectionHasChanged();
        }

        function selectionHasChanged() {
            BattleModel.updateNodesThatCanBeReachedFromSelectedNode(currentlySelectedNode);
        }

        function requestNodeForcesToGoToNode(destinationNode) {
            if(!currentlySelectedNode) {
                return;
            }
            var eventToHandleForceMovement = BattleModel.moveForcesBetweenNodesAndGetRelatedEvent(currentlySelectedNode, destinationNode);
            if(eventToHandleForceMovement) {
                BattleScheduler.addEvent(BattleEvents.MOVE_ARMY, eventToHandleForceMovement);
            }
            removeCurrentSelection();
        }

        function hasEnded() {
            return BattleModel.hasEnded();
        }
    }
})();
