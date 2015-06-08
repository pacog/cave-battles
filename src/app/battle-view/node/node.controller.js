(function() {
    'use strict';

    angular.module('caveBattles.battle-view.node-controller', [
        'caveBattles.battle-handler'
    ])

    .controller('NodeCtrl', NodeController);

    function NodeController($scope, BattleHandler) {
        $scope.nodeClicked = function($event) {
            $event.stopPropagation();
            if($scope.nodeInfo.canBeReachedBySelectedNode) {
                BattleHandler.requestNodeForcesToGoToNode($scope.nodeInfo);
            } else {
                BattleHandler.requestSelection($scope.nodeInfo);
            }
        };

        $scope.getTopFill = function() {
            if(!$scope.nodeInfo.partialOwner) {
                return 100;
            }
            return 100*(1 - ($scope.nodeInfo.ownerStrength/$scope.nodeInfo.DEFAULT_NODE_STRENGTH));
        };
    }
})();
