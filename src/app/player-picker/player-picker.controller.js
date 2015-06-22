(function() {
    'use strict';

    angular.module('caveBattles.player-picker.controller', [
        'ngLodash',
        'caveBattles.battle.constants'
    ])
        .controller('PlayerPickerController', PlayerPickerController);

    function PlayerPickerController($scope, lodash, DEFAULT_INITIAL_FORCE) {
        var vm = this;

        init();

        function init() {
            $scope.$watch('vm.map', mapChanged);
        }

        function mapChanged(newMap) {
            if(newMap) {
                var initialNodes = lodash.filter(vm.map.map.nodes, { initialNode: true });
                vm.chosenPlayers = [];
                for(var i=0; i<initialNodes.length; i++) {
                    vm.chosenPlayers.push({
                        initialNode: initialNodes[i].id,
                        number: (i + 1) + '',
                        initialForce: DEFAULT_INITIAL_FORCE,
                        type: (i === 0)? 'human' : 'AI'
                    });
                }
            }
        }
    }
})();