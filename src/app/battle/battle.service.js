'use strict';
(function() {
    angular.module('caveBattles.battle', ['ngLodash'])

    .service('Battle', ['lodash',

        function(_) {

            var options;
            var battleInfoSubscribers = [];

            var init = function(battleOptions) {
                options = angular.copy(battleOptions);
            };

            var subscribeToChangeInBattleInfo = function(callback) {
                battleInfoSubscribers.push(callback);
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
