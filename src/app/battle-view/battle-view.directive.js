'use strict';

angular.module('caveBattles.battle-view', [
    'caveBattles.battle',
    'caveBattles.battle-view.node',
    'caveBattles.battle-view.tunnel',
    'caveBattles.battle-view.army'
])

.directive('battleView', function (Battle) {

    return {
        restrict: 'E',
        templateUrl: 'app/battle-view/battle-view.tpl.html',
        replace: true,
        link: function(scope) {

            var init = function() {
                Battle.subscribeToChangeInBattleInfo(onBattleInfoChanged);
            };

            var onBattleInfoChanged = function(newBattleInfo) {
                scope.battleInfo = newBattleInfo;
            };

            init();
        }
    };
});
