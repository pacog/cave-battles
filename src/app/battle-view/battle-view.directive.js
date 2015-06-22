(function() {
    'use strict';

    angular.module('caveBattles.battle-view', [
        'caveBattles.battle-view.node',
        'caveBattles.battle-view.tunnel',
        'caveBattles.battle-view.army',
        'caveBattles.battle-view.controller'
    ])

    .directive('battleView', BattleViewDirective);

    function BattleViewDirective() {
        return {
            restrict: 'E',
            templateUrl: 'app/battle-view/battle-view.tpl.html',
            replace: true,
            controller: 'BattleViewController',
            controllerAs: 'vm'
        };
    }

})();
