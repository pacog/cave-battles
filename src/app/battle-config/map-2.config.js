(function() {
    'use strict';
    angular.module('caveBattles.maps.map2', [])
        .constant('MAP2' , {
            name: 'Hypercube',
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
                        x: 30,
                        y: 10
                    }
                },{
                    id: '3',
                    position: {
                        x: 70,
                        y: 10
                    }
                },{
                    id: '4',
                    position: {
                        x: 90,
                        y: 10
                    },
                    initialNode: true
                },{
                    id: '5',
                    position: {
                        x: 10,
                        y: 30
                    }
                },{
                    id: '6',
                    position: {
                        x: 30,
                        y: 30
                    }
                },{
                    id: '7',
                    position: {
                        x: 70,
                        y: 30
                    }
                },{
                    id: '8',
                    position: {
                        x: 90,
                        y: 30
                    }
                },{
                    id: '9',
                    position: {
                        x: 10,
                        y: 70
                    }
                },{
                    id: '10',
                    position: {
                        x: 30,
                        y: 70
                    }
                },{
                    id: '11',
                    position: {
                        x: 70,
                        y: 70
                    }
                },{
                    id: '12',
                    position: {
                        x: 90,
                        y: 70
                    }
                },{
                    id: '13',
                    position: {
                        x: 10,
                        y: 90
                    },
                    initialNode: true
                },{
                    id: '14',
                    position: {
                        x: 30,
                        y: 90
                    }
                },{
                    id: '15',
                    position: {
                        x: 70,
                        y: 90
                    }
                },{
                    id: '16',
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
                    from: '1',
                    to: '5'
                },{
                    from: '2',
                    to: '6'
                },{
                    from: '5',
                    to: '6'
                },{
                    from: '3',
                    to: '4'
                },{
                    from: '3',
                    to: '7'
                },{
                    from: '4',
                    to: '8'
                },{
                    from: '7',
                    to: '8'
                },{
                    from: '9',
                    to: '10'
                },{
                    from: '9',
                    to: '13'
                },{
                    from: '13',
                    to: '14'
                },{
                    from: '10',
                    to: '14'
                },{
                    from: '11',
                    to: '12'
                },{
                    from: '11',
                    to: '15'
                },{
                    from: '15',
                    to: '16'
                },{
                    from: '12',
                    to: '16'
                },{
                    from: '6',
                    to: '7'
                },{
                    from: '6',
                    to: '10'
                },{
                    from: '10',
                    to: '11'
                },{
                    from: '7',
                    to: '11'
                }]
            }
        });
})();