(function() {
    'use strict';

    angular.module('caveBattles.utils.id-generator', [])
        .factory('IdGenerator', IdGenerator);

    function IdGenerator() {

        var currentId = 42;
        var factory = {
            getNewId: getNewId
        };

        return factory;

        function getNewId() {
            return currentId++;
        }

    }
})();