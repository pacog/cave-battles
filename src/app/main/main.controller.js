'use strict';

angular.module('caveBattles.main', ['caveBattles.battle', 'caveBattles.battle-view'])

.controller('MainCtrl', function (Battle) {

    var battleConfig = {
        map: {},
        players: {}
    };

    Battle.init(battleConfig);
});
