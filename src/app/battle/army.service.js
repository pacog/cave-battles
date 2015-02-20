'use strict';
(function() {
    angular.module('caveBattles.army', ['caveBattles.utils.geometry'])

    .factory('Army', ['Geometry',

        function(Geometry) {
            var ArmyClass = function(options) {
                this.DEFAULT_INIT_FORCE = 20;
                this.DEFAULT_SPEED = 5; //Units/second
                this.player = options.player;
                if(options.node) {
                    this.position = angular.copy(options.node.position);
                } else {
                    this.position = angular.copy(options.originNode.position);
                }
                this.node = options.node;
                this.originNode = options.originNode;
                this.force = angular.isUndefined(options.force)? this.DEFAULT_INIT_FORCE : options.force;
            };

            ArmyClass.prototype = {
                timeToGetToDestination: function(destinationNode) {
                    var distance = Geometry.distanceBetweenPoints(this.originNode.position, destinationNode.position);
                    return distance/this.DEFAULT_SPEED;
                }
            };

            return ArmyClass;
        }
    ]);
})();