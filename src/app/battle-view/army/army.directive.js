'use strict';

angular.module('caveBattles.battle-view.army', ['caveBattles.battle-view.army-controller'])

.directive('army', function () {

    return {
        restrict: 'E',
        templateUrl: 'app/battle-view/army/army.tpl.html',
        scope: {
            armyInfo: '='
        },
        replace: true,
        controller: 'ArmyCtrl'
    };
});