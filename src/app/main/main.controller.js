'use strict';

angular.module('caveBattles.main', ['caveBattles.battle', 'caveBattles.battle-view'])

.controller('MainCtrl', function (Battle) {

    var battleConfig = {
        map: {
            nodes: [{
                id: '1',
                position: {
                    x: 10,
                    y: 45
                }
            },{
                id: '2',
                position: {
                    x: 90,
                    y: 30
                }
            },{
                id: '3',
                position: {
                    x: 10,
                    y: 10
                }
            },{
                id: '4',
                position: {
                    x: 50,
                    y: 30
                }
            },{
                id: '5',
                position: {
                    x: 10,
                    y: 30
                }
            }],
            tunnels: [{
                from: '1',
                to: '2'
            },{
                from: '2',
                to: '3'
            },{
                from: '3',
                to: '4'
            },{
                from: '1',
                to: '5'
            }],
            players: [{
                initialNode: '1',
                initialForce: 20
            }]
        }
    };

    Battle.init(battleConfig);
});
