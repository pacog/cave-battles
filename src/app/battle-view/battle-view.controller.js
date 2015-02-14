'use strict';

angular.module('caveBattles.battle-view.controller', ['caveBattles.battle'])

.controller('BattleViewCtrl', function ($scope, Battle) {

    var init = function () {
        Battle.subscribeToChangeInBattleInfo(onBattleInfoChanged);
    };

    var onBattleInfoChanged = function(newBattleInfo) {
        $scope.battleInfo = newBattleInfo;
    };

    init();
});
