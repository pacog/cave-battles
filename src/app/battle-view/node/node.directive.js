'use strict';

angular.module('caveBattles.battle-view.node', [])

.directive('node', function () {

    return {
        restrict: 'E',
        templateUrl: 'app/battle-view/node/node.tpl.html',
        scope: {
            nodeInfo: '='
        },
        replace: true
    };
});