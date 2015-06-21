(function() {
    'use strict';

    angular.module('caveBattles.main-screen.controller', [
        'caveBattles.battle-handler',
        'caveBattles.battle-view',
        'battleCaves.battle-config'
    ])
        .controller('MainScreenController', MainScreenController);

    function MainScreenController(BattleHandler, BattleConfig) {
        BattleHandler.init(BattleConfig.get());
    }

})();
