'use strict';

angular.module('caveBattles.battle-view.army', [])

.directive('army', function () {

    return {
        restrict: 'E',
        templateUrl: 'app/battle-view/army/army.tpl.html',
        scope: {
            armyInfo: '='
        },
        replace: true
    };
});