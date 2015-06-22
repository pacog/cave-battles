(function() {
    'use strict';

    angular.module('caveBattles.main-screen', [
        'caveBattles.main-screen.controller',
        'caveBattles.map-picker',
        'caveBattles.battle-view',
        'caveBattles.ai-trainer',
        'caveBattles.player-picker'
    ])
        .directive('mainScreen', MainScreenDirective);

    function MainScreenDirective() {
        return {
            restrict: 'E',
            templateUrl: 'app/main/main-screen.tpl.html',
            replace: true,
            controller: 'MainScreenController',
            controllerAs: 'vm'
        };
    }
})();