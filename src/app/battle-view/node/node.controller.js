'use strict';

angular.module('caveBattles.battle-view.node-controller', ['caveBattles.battle'])

.controller('NodeCtrl', function ($scope, Battle) {

    $scope.nodeClicked = function() {
        if($scope.nodeInfo.canBeReachedBySelectedNode) {
            Battle.requestNodeForcesToGoToNode($scope.nodeInfo);
        } else {
            Battle.requestSelection($scope.nodeInfo);
        }
    };

    $scope.getTopFill = function() {
        if(!$scope.nodeInfo.partialOwner) {
            return 100;
        }
        return 100*(1 - ($scope.nodeInfo.ownerStrength/$scope.nodeInfo.DEFAULT_NODE_STRENGTH));
    };
});