(function() {
    'use strict';
    angular.module('caveBattles.map-picker', [
        'caveBattles.map-picker.controller'
    ])
        .directive('mapPicker', MapPickerDirective);

    function MapPickerDirective() {
        return {
            restrict: 'E',
            scope: {
                chosenMap: '='
            },
            templateUrl: 'app/map-picker/map-picker.tpl.html',
            controller: 'MapPickerController',
            controllerAs: 'vm',
            bindToController: true
        };
    }
})();