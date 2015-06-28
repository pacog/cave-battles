(function() {
    'use strict';

    angular.module('caveBattles.battle-config', [
        'caveBattles.maps.map1',
        'caveBattles.maps.map2',
        'caveBattles.maps.map3'
    ])
        .factory('BattleConfig', BattleConfig);

    function BattleConfig($q, MAP1, MAP2, MAP3) {
        var factory = {
            getAllMaps: getAllMaps
        };
        return factory;

        function getAllMaps() {
            var willGetAllMaps = $q.defer();

            willGetAllMaps.resolve([MAP1, MAP2, MAP3]);

            return willGetAllMaps.promise;
        }
    }
})();