(function() {
    'use strict';
    angular.module('caveBattles.player-picker', [
        'caveBattles.player-picker.controller'
    ])
        .directive('playerPicker', PlayerPickerDirective);

    function PlayerPickerDirective() {
        return {
            restrict: 'E',
            scope: {
                map: '=',
                chosenPlayers: '='
            },
            templateUrl:'app/player-picker/player-picker.tpl.html',
            controller: 'PlayerPickerController',
            controllerAs: 'vm',
            bindToController: true
        };
    }
})();