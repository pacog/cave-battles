(function() {
    'use strict';
    angular.module('caveBattles.maps.map3', [])
        .constant('MAP3' , {
            name: 'The pyramid',
            map: {
                nodes: [{
                    id: '1',
                    position: {
                        x: 50,
                        y: 20
                    },
                    initialNode: true
                },{
                    id: '2',
                    position: {
                        x: 20,
                        y: 80
                    },
                    initialNode: true
                },{
                    id: '3',
                    position: {
                        x: 80,
                        y: 80
                    },
                    initialNode: true
                },{
                    id: '4',
                    position: {
                        x: 40,
                        y: 40
                    }
                },{
                    id: '5',
                    position: {
                        x: 60,
                        y: 40
                    }
                },{
                    id: '6',
                    position: {
                        x: 50,
                        y: 60
                    }
                },{
                    id: '7',
                    position: {
                        x: 30,
                        y: 60
                    }
                },{
                    id: '8',
                    position: {
                        x: 40,
                        y: 80
                    }
                },{
                    id: '9',
                    position: {
                        x: 60,
                        y: 80
                    }
                },{
                    id: '10',
                    position: {
                        x: 70,
                        y: 60
                    }
                }],
                tunnels: [{
                    from: '1',
                    to: '4'
                },{
                    from: '1',
                    to: '5'
                },{
                    from: '4',
                    to: '5'
                },{
                    from: '4',
                    to: '6'
                },{
                    from: '5',
                    to: '6'
                },{
                    from: '2',
                    to: '7'
                },{
                    from: '2',
                    to: '8'
                },{
                    from: '7',
                    to: '8'
                },{
                    from: '7',
                    to: '6'
                },{
                    from: '8',
                    to: '6'
                },{
                    from: '3',
                    to: '9'
                },{
                    from: '3',
                    to: '10'
                },{
                    from: '9',
                    to: '10'
                },{
                    from: '9',
                    to: '6'
                },{
                    from: '10',
                    to: '6'
                },{
                    from: '10',
                    to: '5'
                },{
                    from: '4',
                    to: '7'
                },{
                    from: '8',
                    to: '9'
                }]
            }
        });
})();