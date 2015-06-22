(function() {
    'use strict';
    angular.module('caveBattles.battle.constants', [])

        .constant('DEFAULT_FORCE_TO_TAKE', 1) // 0 to 1
        .constant('FILL_NODES_EVERY', 1000) //ms
        .constant('PLAN_AI_EVERY', 1000) //ms
        .constant('DEFAULT_INITIAL_FORCE', 10)
    ;

})();