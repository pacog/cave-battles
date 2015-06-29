(function() {
    'use strict';
    angular.module('caveBattles.battle-preview', [
        'caveBattles.battle-preview.controller',
        'caveBattles.battle-view.node',
        'caveBattles.battle-view.tunnel'
    ])
        .directive('battlePreview', BattlePreviewDirective);

    function BattlePreviewDirective() {
        return {
            restrict: 'E',
            templateUrl: 'app/battle-preview/battle-preview.tpl.html',
            scope: {
                map: '=',
                players: '='
            },
            controller: 'BattlePreviewController',
            controllerAs: 'vm',
            bindToController: true
        };
    }
})();