(function() {
    'use strict';

    angular.module('caveBattles.battle-preview.controller', [
        'caveBattles.battle-model',
        'ngLodash'
    ])
        .controller('BattlePreviewController', BattlePreviewController);

    function BattlePreviewController($scope, lodash, BattleModel) {
        var vm = this;

        init();

        function init() {
            $scope.$watch('vm.map', mapChanged);
            $scope.$watch('vm.players', playersChanged);
        }

        function mapChanged(newMap) {
            if(newMap) {
                var options = angular.copy(newMap);
                BattleModel.init(options);
                vm.battleInfo = BattleModel.model;
            }
        }

        function playersChanged(newPlayers) {
            vm.playersToShow = newPlayers;
            if(newPlayers) {
                angular.forEach(vm.playersToShow, fillPlayerPosition);
            }
        }

        function fillPlayerPosition(player) {
            var nodeForPlayer = lodash.findWhere(vm.battleInfo.nodes, {id: player.initialNode});
            player.position = angular.copy(nodeForPlayer.position);
        }
    }

})();