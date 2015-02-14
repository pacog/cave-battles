'use strict';

angular.module('caveBattles.battle-view.controller', ['caveBattles.battle'])

.controller('BattleViewCtrl', function (Battle) {

    var init = function () {
        Battle.subscribeToChangeInBattleInfo(onBattleInfoChanged);
    };

    var onBattleInfoChanged = function() {};

    init();
});
