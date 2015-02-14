'use strict';

angular.module('caveBattles.battle-view', ['caveBattles.battle-view.controller'])

.directive('battleView', function () {
    return {
        restrict: 'E',
        templateUrl: 'app/battle-view/battle-view.tpl.html'
    };
});
