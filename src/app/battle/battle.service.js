'use strict';
(function() {
    angular.module('caveBattles.battle', ['ngLodash', 'caveBattles.player', 'caveBattles.tunnel', 'caveBattles.army'])

    .service('Battle', ['lodash', 'Player', 'Tunnel', 'Army',

        function(_, Player, Tunnel, Army) {

            var options;
            var battleInfoSubscribers = [];
            var battleInfo;

            var init = function(battleOptions) {
                options = angular.copy(battleOptions);
                initBattleInfoFromOptions(options);
            };

            var initBattleInfoFromOptions = function(options) {
                battleInfo = {};

                battleInfo.nodes = {};
                angular.forEach(options.map.nodes, function(nodeOptions) {
                    battleInfo.nodes[nodeOptions.id] = nodeOptions;
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

            return {
                init: init,
                subscribeToChangeInBattleInfo: subscribeToChangeInBattleInfo,
                unsubscribeToChangeInBattleInfo: unsubscribeToChangeInBattleInfo
            };

        }
    ]);
})();
