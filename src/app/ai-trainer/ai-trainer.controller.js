(function() {
    'use strict';

    angular.module('caveBattles.ai-trainer.controller', [
        'caveBattles.battle-simulator'
    ])
        .controller('AITrainerController', AITrainerController);

    function AITrainerController($timeout, BattleSimulator) {
        var TIMES_TO_RUN = 10;
        var vm = this;

        vm.runTrainer = runTrainer;

        function runTrainer() {
            vm.results = [];

            for(var i=0; i<TIMES_TO_RUN; i++) {
                vm.results.push(BattleSimulator.simulate(vm.chosenMap, vm.chosenPlayers));
            }
        }
    }

})();