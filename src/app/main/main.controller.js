(function() {
    'use strict';

    angular.module('caveBattles.main', [
        'caveBattles.battle-handler',
        'caveBattles.battle-view',
        'battleCaves.battle-config'
    ])
        .controller('MainController', MainController);

    function MainController(BattleHandler, BattleConfig) {
        BattleHandler.init(BattleConfig.get());
    }

})();
