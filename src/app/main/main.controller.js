'use strict';

angular.module('caveBattles.main', ['caveBattles.battle', 'caveBattles.battle-view'])

.controller('MainCtrl', function (Battle) {

    var battleConfig = {
        map: {
            nodes: [{
                id: '1',
                position: [10, 50]
            },{
                id: '2',
                position: [90, 50]
            }],
            connections: [{
                from: '1',
                to: '2'
            }],
            players: [{
                initialNode: '1',
                initialForce: 20
            }]
        }
    };

    Battle.init(battleConfig);
});
