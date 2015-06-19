(function() {
    'use strict';

    angular.module('caveBattles.battle-view.army', [
        'caveBattles.battle-view.army-controller'
    ])
        .directive('army', ArmyDirective);

    function ArmyDirective() {
        return {
            restrict: 'E',
            templateUrl: 'app/battle-view/army/army.tpl.html',
            scope: {
                armyInfo: '='
            },
            replace: true,
            controller: 'ArmyController',
            controllerAs: 'vm',
            bindToController: true
        };
    }
})();
