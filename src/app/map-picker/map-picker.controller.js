(function() {
    'use strict';
    angular.module('caveBattles.map-picker.controller', [
        'caveBattles.battle-config'
    ])
        .controller('MapPickerController', MapPickerController);

    function MapPickerController(BattleConfig) {
        var vm = this;
        vm.chooseMap = chooseMap;

        init();

        function init() {
            BattleConfig.getAllMaps().then(function(allMaps) {
                vm.maps = allMaps;
                vm.chosenMap = vm.maps[0];
            });
        }

        function chooseMap(map) {
            if(vm.chosenMap && vm.chosenMap === map) {
                vm.chosenMap = null;
            } else {
                vm.chosenMap = map;
            }
        }
    }
})();