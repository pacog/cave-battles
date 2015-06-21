(function() {
    'use strict';

    angular.module('battleCaves.battle-config', [
        'caveBattles.maps.map1'
    ])
        .factory('BattleConfig', BattleConfig);

    function BattleConfig($q, MAP1) {
        var factory = {
            getAllMaps: getAllMaps
        };
        return factory;

        function getAllMaps() {
            var willGetAllMaps = $q.defer();

            willGetAllMaps.resolve([MAP1]);

            return willGetAllMaps.promise;
        }
    }
})();