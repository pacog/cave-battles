(function() {
    'use strict';

    angular.module('caveBattles.utils.timer', [])
        .factory('Timer', Timer);

    function Timer() {

        var artificallySetTime = null;

        var factory = {
            getTime: getTime,
            setTime: setTime,
            restart: restart
        };

        return factory;

        function restart() {
            artificallySetTime = null;
        }

        function getTime() {
            return artificallySetTime || (new Date()).getTime();
        }

        function setTime(newTime) {
            artificallySetTime = newTime;
        }
    }
})();