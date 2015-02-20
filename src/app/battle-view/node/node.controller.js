'use strict';

angular.module('caveBattles.battle-view.node-controller', ['caveBattles.battle'])

.controller('NodeCtrl', function ($scope, Battle) {

    $scope.nodeClicked = function() {
        if($scope.nodeInfo.canBeReachedBySelectedArmy) {
            Battle.requestSelectedArmyToGoToNode($scope.nodeInfo);
        }
    };

});