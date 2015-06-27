(function() {
    'use strict';

    angular.module('caveBattles.battle-simulator', [
        'caveBattles.battle-handler'
    ])
        .factory('BattleSimulator', BattleSimulator);

    function BattleSimulator(BattleHandler) {
        var MAX_EXECUTION_TIME = 10000; //ms
        var factory = {
            simulate: simulate
        };
        return factory;

        function simulate(battleInfo, playerInfo) {
            debugger;
            BattleHandler.init(battleInfo, playerInfo);
            var startingTime = (new Date()).getTime();
            while(!BattleHandler.hasEnded() && ((new Date()).getTime() - startingTime) < MAX_EXECUTION_TIME) {
                BattleHandler.fastForwardAndExecuteNextAction();
            }
            return {};
        }

    }
})();