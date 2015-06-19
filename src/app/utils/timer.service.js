(function() {
    'use strict';

    angular.module('caveBattles.utils.timer', [])
        .factory('Timer', Timer);

    function Timer() {

        var factory = {
            getTime: getTime
        };

        return factory;

        function getTime() {
            return (new Date()).getTime();
        }
    }
})();