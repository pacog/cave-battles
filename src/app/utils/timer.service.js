'use strict';
(function() {
    angular.module('caveBattles.utils.timer', [])

    .factory('Timer',

        function() {

            var getTime = function() {
                return (new Date()).getTime();
            };

            return {
                getTime: getTime
            };
        }
    );
})();