'use strict';
(function() {
    angular.module('caveBattles.battle', ['ngLodash', 'caveBattles.player'])

    .service('Battle', ['lodash', 'Player',

        function(_, Player) {

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
