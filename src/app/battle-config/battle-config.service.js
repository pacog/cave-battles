(function() {
    'use strict';

    angular.module('battleCaves.battle-config', [
        'caveBattles.maps.map1'
    ])
        .factory('BattleConfig', BattleConfig);

    function BattleConfig(MAP1) {
        var factory = {
            get: get
        };
        return factory;

        function get() {
            return MAP1;
        }
    }
})();