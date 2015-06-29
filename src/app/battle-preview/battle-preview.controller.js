(function() {
    'use strict';

    angular.module('caveBattles.battle-preview.controller', [
        'caveBattles.battle-model'
    ])
        .controller('BattlePreviewController', BattlePreviewController);

    function BattlePreviewController($scope, BattleModel) {
        var vm = this;

        init();

        function init() {
            $scope.$watch('vm.map', mapChanged);
        }

        function mapChanged(newMap) {
            if(newMap) {
                var options = angular.copy(newMap);
                BattleModel.init(options);
                vm.battleInfo = BattleModel.model;
            }
        }
    }

})();