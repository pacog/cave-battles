'use strict';
(function() {
    angular.module('caveBattles.battle', ['ngLodash', 'caveBattles.player', 'caveBattles.tunnel'])

    .service('Battle', ['lodash', 'Player', 'Tunnel',

        function(_, Player, Tunnel) {

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
                angular.forEach(options.map.players, function(playerOptions) {
                    battleInfo.players.push(new Player(playerOptions));
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
