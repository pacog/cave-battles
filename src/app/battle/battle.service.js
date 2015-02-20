'use strict';
(function() {
    angular.module('caveBattles.battle', ['ngLodash', 'caveBattles.player', 'caveBattles.tunnel', 'caveBattles.army', 'caveBattles.node', 'caveBattles.battle-scheduler'])

    .service('Battle', ['lodash', 'Player', 'Tunnel', 'Army', 'Node', 'BattleScheduler', 'BattleEvents',

        function(_, Player, Tunnel, Army, Node, BattleScheduler, BattleEvents) {

            var options;
            var battleInfoSubscribers = [];
            var battleInfo;
            var currentlySelectedArmy = null;
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

                    battleInfo.armies.push(new Army({
                        node: battleInfo.nodes[playerOptions.initialNode],
                        force: playerOptions.initialForce,
                        player: player
                    }));
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

            var requestSelection = function(army) {
                if(!!army.selected) {
                    currentlySelectedArmy = null;
                    army.selected = false;
                } else {
                    if(currentlySelectedArmy) {
                        currentlySelectedArmy.selected = false;
                    }
                    currentlySelectedArmy = army;
                    army.selected = true;
                }
                selectionHasChanged();
            };

            var selectionHasChanged = function() {
                angular.forEach(battleInfo.nodes, function(node) {
                    node.canBeReachedBySelectedArmy = canArmyReachNode(currentlySelectedArmy, node);
                });
            };

            var canArmyReachNode = function(army, node) {
                if(!node || !army) {
                    return false;
                }
                for(var i=0; i<battleInfo.tunnels.length; i++) {
                    if(battleInfo.tunnels[i].connectsNodes(army.node, node)) {
                        return true;
                    }
                }
                return false;
            };

            var requestSelectedArmyToGoToNode = function(node) {
                if(!node || !currentlySelectedArmy || !canArmyReachNode(currentlySelectedArmy, node)) {
                    return false;
                }
                BattleScheduler.addEvent(BattleEvents.MOVE_ARMY, {
                    army: currentlySelectedArmy,
                    destinationNode: node,
                    battle: publicInterface
                });
            };

            var getPartOfArmy = function(army, desiredForce) {
                if(angular.isUndefined(desiredForce)) {
                    desiredForce = Math.floor(army.force*DEFAULT_FORCE_TO_TAKE);
                }
                var availableForce = desiredForce;
                if(desiredForce > army.force) {
                    availableForce = army.force;
                }
                army.force = army.force - availableForce;
                if(army.force === 0) {
                    deleteArmy(army);
                }
                if(availableForce > 0) {
                    var newArmy = new Army({
                        force: availableForce,
                        player: army.player,
                        originNode: army.node
                    });
                    battleInfo.armies.push(newArmy);
                    return newArmy;
                } else {
                    return false;
                }
            };

            var deleteArmy = function(army) {
                army.deleted = true;
                battleInfo.armies = _.without(battleInfo.armies, army);
            };

            var getBattleInfo = function() {
                return battleInfo;
            };

            var publicInterface = {
                init: init,
                subscribeToChangeInBattleInfo: subscribeToChangeInBattleInfo,
                unsubscribeToChangeInBattleInfo: unsubscribeToChangeInBattleInfo,
                requestSelection: requestSelection,
                requestSelectedArmyToGoToNode: requestSelectedArmyToGoToNode,
                getPartOfArmy: getPartOfArmy,
                getBattleInfo: getBattleInfo,
                deleteArmy: deleteArmy
            };

            return publicInterface;
        }
    ]);
})();
