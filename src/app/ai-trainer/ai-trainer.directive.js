(function() {
    'use strict';

    angular.module('caveBattles.ai-trainer', [
        'caveBattles.ai-trainer.controller'
    ])
        .directive('aiTrainer', AITrainerDirective);

    function AITrainerDirective() {
        return {
            restrict: 'E',
            templateUrl: 'app/ai-trainer/ai-trainer.tpl.html',
            controller: 'AITrainerController',
            controllerAs: 'vm'
        };
    }
})();