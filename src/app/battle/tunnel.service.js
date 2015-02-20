'use strict';
(function() {
    angular.module('caveBattles.tunnel', ['caveBattles.utils.id-generator', 'caveBattles.utils.geometry'])

    .factory('Tunnel', ['IdGenerator', 'Geometry',

        function(IdGenerator, Geometry) {

            var TunnelClass = function(tunnelInfo, nodes) {
                this.init(tunnelInfo, nodes);
            };

            TunnelClass.prototype = {

                init: function(tunnelInfo, nodes) {
                    this.id = IdGenerator.getNewId();
                    this.from = nodes[tunnelInfo.from];
                    this.to = nodes[tunnelInfo.to];
                    this.length = Geometry.distanceBetweenPoints(this.from.position, this.to.position);
                    this.middle = Geometry.pointInBetween(this.from.position, this.to.position);
                    this.inclinationDeg = Geometry.inclinationFromTwoPointsDeg(this.from.position, this.to.position);
                },

                connectsNodes: function(node1, node2) {
                    if((this.from.id === node1.id) && ((this.to.id === node2.id)) || (this.to.id === node1.id) && ((this.from.id === node2.id))) {
                        return true;
                    }
                    return false;
                }
            };

            return TunnelClass;
        }
    ]);
})();