'use strict';

angular.module('caveBattles.battle-view.node', ['caveBattles.battle-view.node-controller'])

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