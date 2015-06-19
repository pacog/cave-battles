(function() {
    'use strict';

    angular.module('caveBattles.battle-view.node', [
        'caveBattles.battle-view.node-controller'
    ])
        .directive('node', NodeDirective);

    function NodeDirective() {
        return {
            restrict: 'E',
            templateUrl: 'app/battle-view/node/node.tpl.html',
            scope: {
                nodeInfo: '='
            },
            controller: 'NodeController',
            controllerAs: 'vm',
            bindToController: true,
            replace: true
        };
    }
})();
