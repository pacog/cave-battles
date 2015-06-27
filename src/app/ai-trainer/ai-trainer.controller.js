(function() {
    'use strict';

    angular.module('caveBattles.ai-trainer.controller', [
        'caveBattles.battle-simulator'
    ])
        .controller('AITrainerController', AITrainerController);

    function AITrainerController(BattleSimulator) {
        var vm = this;

        vm.runTrainer = runTrainer;

        function runTrainer() {
            vm.results = BattleSimulator.simulate(vm.chosenMap, vm.chosenPlayers);
        }
    }

})();