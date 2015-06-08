(function() {
    'use strict';

    angular.module('caveBattles.battle-model', [
        'ngLodash',
        'caveBattles.player',
        'caveBattles.tunnel',
        'caveBattles.army',
        'caveBattles.node',
        'caveBattles.battle.constants'
    ])
        .factory('BattleModel', BattleModel);

    BattleModel.$inject = ['lodash', 'Player', 'Tunnel', 'Army', 'Node', 'DEFAULT_FORCE_TO_TAKE'];

    function BattleModel(_, Player, Tunnel, Army, Node, DEFAULT_FORCE_TO_TAKE) {

        var model = {
            nodes: null,
            players: null,
            armies: null,
            tunnels: null
        };
        var battleModelInitSubscribers = [];

        var factory = {
            init: init,
            cleanDeletedArmies: cleanDeletedArmies,
            updateNodesThatCanBeReachedFromSelectedNode: updateNodesThatCanBeReachedFromSelectedNode,
            model: model,
            subscribeToBattleModelInitiallised: subscribeToBattleModelInitiallised,
            unsubscribeToBattleModelInitiallised: unsubscribeToBattleModelInitiallised,
            moveForcesBetweenNodesAndGetRelatedEvent: moveForcesBetweenNodesAndGetRelatedEvent
        };

        return factory;

        function init(options) {
            model.nodes = {};
            model.players = [];
            model.armies = [];
            model.tunnels = [];

            angular.forEach(options.map.nodes, function(nodeOptions) {
                model.nodes[nodeOptions.id] = new Node(nodeOptions, factory);
            });

            angular.forEach(options.map.players, function(playerOptions) {
                var player = new Player(playerOptions);

                model.players.push(player);
                model.nodes[playerOptions.initialNode].currentOwner = player;
                model.nodes[playerOptions.initialNode].ownerStrength = player.initialForce;
            });

            
            angular.forEach(options.map.tunnels, function(tunnelOptions) {
                model.tunnels.push(new Tunnel(tunnelOptions, model.nodes));
            });

            notifyBattleModelInitialised();
        }

        function updateNodesThatCanBeReachedFromSelectedNode(currentlySelectedNode) {
            for(var nodeId in model.nodes) {
                model.nodes[nodeId].updateCanBeReachedBySelectedNode(currentlySelectedNode);
            }
        }

        function notifyBattleModelInitialised() {
            angular.forEach(battleModelInitSubscribers, function(callback) {
                callback();
            });
        }

        function subscribeToBattleModelInitiallised(callback) {
            battleModelInitSubscribers.push(callback);
            callback();
        }

        function unsubscribeToBattleModelInitiallised(callback) {
            battleModelInitSubscribers = _.without(battleModelInitSubscribers, callback);
        }

        function cleanDeletedArmies() {
            var armiesToClean = [];
            for(var i=0; i<model.armies.length; i++) {
                if(!!model.armies[i].deleted) {
                    armiesToClean.push(model.armies[i]);
                }
            }
            for(i=0; i<armiesToClean.length; i++) {
                model.armies = _.without(model.armies, armiesToClean[i]);
            }
        }

        function moveForcesBetweenNodesAndGetRelatedEvent(originNode, destinationNode) {
            var desiredForce = Math.floor(originNode.ownerStrength*DEFAULT_FORCE_TO_TAKE);
            if(desiredForce === 0) {
                return null;
            }
            var newArmy = new Army({
                force: desiredForce,
                player: originNode.currentOwner,
                originNode: originNode
            });
            originNode.ownerStrength = originNode.ownerStrength - desiredForce;
            model.armies.push(newArmy);

            return {
                army: newArmy,
                destinationNode: destinationNode,
                force: desiredForce
            };
            
        }

    }
})();