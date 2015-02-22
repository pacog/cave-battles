'use strict';
(function() {
    angular.module('caveBattles.battle', ['ngLodash', 'caveBattles.player', 'caveBattles.tunnel', 'caveBattles.army', 'caveBattles.node', 'caveBattles.battle-scheduler'])

    .service('Battle', ['lodash', 'Player', 'Tunnel', 'Army', 'Node', 'BattleScheduler', 'BattleEvents',

        function(_, Player, Tunnel, Army, Node, BattleScheduler, BattleEvents) {

            var options;
            var battleInfoSubscribers = [];
            var battleInfo;
            var currentlySelectedNode = null;
            var DEFAULT_FORCE_TO_TAKE = 0.5;

            var init = function(battleOptions) {
                options = angular.copy(battleOptions);
                initBattleInfoFromOptions(options);
            };

            var initBattleInfoFromOptions = function(options) {
                battleInfo = {};

                battleInfo.nodes = {};
                angular.forEach(options.map.nodes, function(nodeOptions) {
                    battleInfo.nodes[nodeOptions.id] = new Node(nodeOptions);
                });

                battleInfo.players = [];
                battleInfo.armies = [];
                angular.forEach(options.map.players, function(playerOptions) {
                    var player = new Player(playerOptions);

                    battleInfo.players.push(player);
                    battleInfo.nodes[playerOptions.initialNode].currentOwner = player;
                    battleInfo.nodes[playerOptions.initialNode].ownerStrength = player.initialForce;
                });

                battleInfo.tunnels = [];
                angular.forEach(options.map.tunnels, function(tunnelOptions) {
                    battleInfo.tunnels.push(new Tunnel(tunnelOptions, battleInfo.nodes));
                });

                notifyBattleInfoChanged(battleInfo);
            };

            var notifyBattleInfoChanged = function() {
                angular.forEach(battleInfoSubscribers, function(callback) {
                    callback(options);
                });
            };

            var subscribeToChangeInBattleInfo = function(callback) {
                battleInfoSubscribers.push(callback);
                callback(battleInfo);
            };

            var unsubscribeToChangeInBattleInfo = function(callback) {
                battleInfoSubscribers = _.without(battleInfoSubscribers, callback);
            };

            var update = function() {
                cleanDeletedArmies();
                BattleScheduler.updateBattleInfo(publicInterface);
            };

            var cleanDeletedArmies = function() {
                var armiesToClean = [];
                for(var i=0; i<battleInfo.armies.length; i++) {
                    if(!!battleInfo.armies[i].deleted) {
                        armiesToClean.push(battleInfo.armies[i]);
                    }
                }
                for(i=0; i<armiesToClean.length; i++) {
                    battleInfo.armies = _.without(battleInfo.armies, armiesToClean[i]);
                }
            };

            var requestSelection = function(node) {
                if(!!node.selected) {
                    currentlySelectedNode = null;
                    node.selected = false;
                } else {
                    if(currentlySelectedNode) {
                        currentlySelectedNode.selected = false;
                    }
                    currentlySelectedNode = node;
                    node.selected = true;
                }
                selectionHasChanged();
            };

            var selectionHasChanged = function() {
                angular.forEach(battleInfo.nodes, function(node) {
                    node.canBeReachedBySelectedNode = canNodeReachNode(currentlySelectedNode, node);
                });
            };

            var canNodeReachNode = function(node1, node2) {
                if(!node1 || !node2) {
                    return false;
                }
                for(var i=0; i<battleInfo.tunnels.length; i++) {
                    if(battleInfo.tunnels[i].connectsNodes(node1, node2)) {
                        return true;
                    }
                }
                return false;
            };

            var requestNodeForcesToGoToNode = function(destinationNode, desiredForce) {
                if(!currentlySelectedNode) {
                    return;
                }
                var originNode = currentlySelectedNode;
                if(angular.isUndefined(desiredForce)) {
                    desiredForce = Math.floor(originNode.ownerStrength*DEFAULT_FORCE_TO_TAKE);
                }
                if(desiredForce > originNode.ownerStrength) {
                    desiredForce = originNode.ownerStrength;
                }
                if(desiredForce === 0) {
                    return;
                }
                var newArmy = new Army({
                    force: desiredForce,
                    player: originNode.currentOwner,
                    originNode: originNode
                });
                originNode.ownerStrength = originNode.ownerStrength - desiredForce;
                battleInfo.armies.push(newArmy);
                BattleScheduler.addEvent(BattleEvents.MOVE_ARMY, {
                    army: newArmy,
                    destinationNode: destinationNode,
                    battle: publicInterface,
                    force: desiredForce
                });

            };

            var getBattleInfo = function() {
                return battleInfo;
            };

            var hasEnded = function() {
                return false;
            };

            var publicInterface = {
                init: init,
                subscribeToChangeInBattleInfo: subscribeToChangeInBattleInfo,
                unsubscribeToChangeInBattleInfo: unsubscribeToChangeInBattleInfo,
                requestSelection: requestSelection,
                getBattleInfo: getBattleInfo,
                hasEnded: hasEnded,
                update: update,
                requestNodeForcesToGoToNode: requestNodeForcesToGoToNode
            };

            return publicInterface;
        }
    ]);
})();
