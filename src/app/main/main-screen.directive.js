(function() {
    'use strict';

    angular.module('caveBattles.main-screen', [
        'caveBattles.main-screen.controller'
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