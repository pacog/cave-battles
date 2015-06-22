(function() {
    'use strict';

    angular.module('caveBattles.main-screen.controller', [
        'caveBattles.battle-handler'
    ])
        .controller('MainScreenController', MainScreenController);

    function MainScreenController(BattleHandler) {
        var vm = this;
        vm.states = {
            MAIN_SCREEN: 'main_screen',
            AI_TRAINER: 'ai_trainer',
            BATTLE: 'battle'
        };
        vm.state = vm.states.MAIN_SCREEN;
        vm.play = play;
        vm.goToAITrainer = goToAITrainer;
        vm.canBePlayed = canBePlayed;

        function play() {
            if(canBePlayed()) {
                vm.state = vm.states.BATTLE;
                BattleHandler.init(vm.chosenMap, vm.chosenPlayers);
            }
        }

        function goToAITrainer() {
            vm.state = vm.states.AI_TRAINER;
        }

        function canBePlayed() {
            if(vm.chosenMap && vm.chosenPlayers) {
                var realPlayers = 0;
                for(var i=0; i<vm.chosenPlayers.length; i++) {
                    if(vm.chosenPlayers[i].type !== 'none' ) {
                        realPlayers++;
                    }
                }
                return realPlayers > 1;
            } else {
                return false;
            }
        }
    }

})();
