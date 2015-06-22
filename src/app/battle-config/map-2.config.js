(function() {
    'use strict';
    angular.module('caveBattles.maps.map2', [])
        .constant('MAP2' , {
            name: 'Map 2',
            map: {
                nodes: [{
                    id: '1',
                    position: {
                        x: 10,
                        y: 10
                    },
                    initialNode: true
                },{
                    id: '2',
                    position: {
                        x: 50,
                        y: 10
                    }
                },{
                    id: '3',
                    position: {
                        x: 90,
                        y: 10
                    },
                    initialNode: true
                },{
                    id: '4',
                    position: {
                        x: 10,
                        y: 50
                    }
                },{
                    id: '5',
                    position: {
                        x: 50,
                        y: 50
                    }
                },{
                    id: '6',
                    position: {
                        x: 90,
                        y: 50
                    }
                },{
                    id: '7',
                    position: {
                        x: 10,
                        y: 90
                    }
                },{
                    id: '8',
                    position: {
                        x: 50,
                        y: 90
                    }
                },{
                    id: '9',
                    position: {
                        x: 90,
                        y: 90
                    },
                    initialNode: true
                }],
                tunnels: [{
                    from: '1',
                    to: '2'
                },{
                    from: '2',
                    to: '3'
                },{
                    from: '6',
                    to: '9'
                },{
                    from: '9',
                    to: '8'
                },{
                    from: '8',
                    to: '7'
                },{
                    from: '7',
                    to: '4'
                },{
                    from: '4',
                    to: '1'
                },{
                    from: '1',
                    to: '5'
                },{
                    from: '3',
                    to: '5'
                },{
                    from: '9',
                    to: '5'
                },{
                    from: '2',
                    to: '5'
                },{
                    from: '8',
                    to: '5'
                }]
            }
        });
})();