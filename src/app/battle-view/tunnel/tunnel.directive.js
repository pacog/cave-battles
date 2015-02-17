'use strict';

angular.module('caveBattles.battle-view.tunnel', [])

.directive('tunnel', function () {

    return {
        restrict: 'E',
        templateUrl: 'app/battle-view/tunnel/tunnel.tpl.html',
        scope: {
            tunnelInfo: '='
        },
        replace: true
    };
});