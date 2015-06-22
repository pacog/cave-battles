(function() {
    'use strict';

    angular.module('caveBattles.battle-view.controller', [
        'caveBattles.battle-handler',
        'caveBattles.battle-model'
    ])
        .controller('BattleViewController', BattleViewController);

    function BattleViewController($timeout, BattleHandler, BattleModel) {
        var vm = this;

        vm.onBackgroundClicked = onBackgroundClicked;

        init();

        function init() {
            BattleModel.subscribeToBattleModelInitiallised(onBattleModelInit);
        }

        function initBattleInfoAutoUpdater() {
            function step() {
                if(BattleHandler.hasEnded()) {
                    vm.battleFinished = true;
                } else {
                    $timeout(BattleHandler.update);
                    window.requestAnimationFrame(step);
                }
            }

            window.requestAnimationFrame(step);
        }

        function onBattleModelInit() {
            vm.battleInfo = BattleModel.model;
            initBattleInfoAutoUpdater();
        }

        function onBackgroundClicked() {
            BattleHandler.removeCurrentSelection();
        }
    }
})();