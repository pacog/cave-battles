(function() {
    'use strict';

    angular.module('caveBattles.battle-view', [
        'caveBattles.battle-handler',
        'caveBattles.battle-model',
        'caveBattles.battle-view.node',
        'caveBattles.battle-view.tunnel',
        'caveBattles.battle-view.army'
    ])

    .directive('battleView', BattleViewDirective);

    function BattleViewDirective($timeout, BattleHandler, BattleModel) {

        return {
            restrict: 'E',
            templateUrl: 'app/battle-view/battle-view.tpl.html',
            replace: true,
            link: function(scope) {
                init();

                function init() {
                    BattleModel.subscribeToBattleModelInitiallised(onBattleModelInit);
                }

                //TODO: should only be called once? If so, don't do it on changes but onReady
                function initBattleInfoAutoUpdater() {

                    function step() {
                        if(!BattleHandler.hasEnded()) {
                            $timeout(BattleHandler.update);
                            window.requestAnimationFrame(step);
                        }
                    }

                    window.requestAnimationFrame(step);
                }

                function onBattleModelInit() {
                    scope.battleInfo = BattleModel.model;
                    initBattleInfoAutoUpdater();
                }

                //TODO: use a controller with controllerAs syntax for this
                scope.onBackgroundClicked = function() {
                    BattleHandler.removeCurrentSelection();
                };
            }
        };
    }

})();
