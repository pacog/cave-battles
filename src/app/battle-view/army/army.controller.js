'use strict';

angular.module('caveBattles.battle-view.army-controller', ['caveBattles.battle'])

.controller('ArmyCtrl', function ($scope, Battle) {

    $scope.armyClicked = function() {
        Battle.requestSelection($scope.armyInfo);
    };

});