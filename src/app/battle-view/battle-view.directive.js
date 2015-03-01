'use strict';

angular.module('caveBattles.battle-view', [
    'caveBattles.battle',
    'caveBattles.battle-view.node',
    'caveBattles.battle-view.tunnel',
    'caveBattles.battle-view.army'
])

.directive('battleView', function ($timeout, Battle) {

    return {
        restrict: 'E',
        templateUrl: 'app/battle-view/battle-view.tpl.html',
        replace: true,
        link: function(scope) {

            var init = function() {
                Battle.subscribeToChangeInBattleInfo(onBattleInfoChanged);
            };

            var initBattleInfoAutoUpdater = function() {

                function step() {
                    if(!Battle.hasEnded()) {
                        $timeout(Battle.update);
                        window.requestAnimationFrame(step);
                    }
                }

                window.requestAnimationFrame(step);
            };

            var onBattleInfoChanged = function(newBattleInfo) {
                scope.battleInfo = newBattleInfo;
                initBattleInfoAutoUpdater();
            };

            scope.onBackgroundClicked = function() {
                Battle.removeCurrentSelection();
            };

            init();
        }
    };
});
