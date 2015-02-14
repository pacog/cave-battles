'use strict';
(function() {
    angular.module('caveBattles.utils.id-generator', [])

    .service('IdGenerator',

        function() {

            var currentId = 42;
            var getNewId = function() {
                return currentId++;
            };
            return {
                getNewId: getNewId
            };

        }
    );
})();