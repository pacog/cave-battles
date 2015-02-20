'use strict';
(function() {
    angular.module('caveBattles.utils.geometry', [])

    .factory('Geometry',

        function() {

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

            var getPointInBetween = function(point1, point2, percentage) {
                return{
                    x: point1.x + (point2.x - point1.x)*percentage,
                    y: point1.y + (point2.y - point1.y)*percentage,
                };
            };

            return {
                distanceBetweenPoints: distanceBetweenPoints,
                pointInBetween: pointInBetween,
                inclinationFromTwoPointsDeg: inclinationFromTwoPointsDeg,
                getPointInBetween: getPointInBetween
            };

        }
    );
})();