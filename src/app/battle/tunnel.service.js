'use strict';
(function() {
    angular.module('caveBattles.tunnel', ['ngLodash', 'caveBattles.utils.id-generator'])

    .factory('Tunnel', ['lodash', 'IdGenerator',

        function(_, IdGenerator) {

            var distanceBetweenPoints = function( point1, point2 ) {
                var xs = 0;
                var ys = 0;

                xs = point2.x - point1.x;
                xs = xs * xs;

                ys = point2.y - point1.y;
                ys = ys * ys;

                return Math.sqrt( xs + ys );
            };

            var pointInBetween = function(point1, point2) {
                return {
                    x: (point1.x + point2.x)/2,
                    y: (point1.y + point2.y)/2
                };
            };

            var inclinationFromTwoPointsDeg = function(point1, point2) {
                return Math.atan2(point2.y - point1.y, point2.x - point1.x) * 180 / Math.PI;
            };

            var TunnelClass = function(tunnelInfo, nodes) {
                this.init(tunnelInfo, nodes);
            };

            TunnelClass.prototype = {

                init: function(tunnelInfo, nodes) {
                    this.id = IdGenerator.getNewId();
                    this.from = nodes[tunnelInfo.from];
                    this.to = nodes[tunnelInfo.to];
                    this.length = distanceBetweenPoints(this.from.position, this.to.position);
                    this.middle = pointInBetween(this.from.position, this.to.position);
                    this.inclinationDeg = inclinationFromTwoPointsDeg(this.from.position, this.to.position);
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