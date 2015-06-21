(function() {
    'use strict';

    angular.module('caveBattles.army', ['caveBattles.utils.geometry'])

        .factory('Army', Army);

    function Army(Geometry) {
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
            timeToGetToDestination: timeToGetToDestination,
            updatePosition: updatePosition,
            removeForce: removeForce,
            destroy: destroy
        };

        return ArmyClass;

        function timeToGetToDestination(destinationNode) {
            var distance = Geometry.distanceBetweenPoints(this.originNode.position, destinationNode.position);
            return distance/this.DEFAULT_SPEED;
        }

        function updatePosition(timeInterval, destinationNode) {
            var percentageComplete = (timeInterval/1000)/this.timeToGetToDestination(destinationNode);
            if(percentageComplete > 1) {
                percentageComplete = 1;
            }
            if(percentageComplete < 0) {
                percentageComplete = 0;
            }
            this.position = Geometry.getPointInBetween(this.originNode.position, destinationNode.position, percentageComplete);
        }

        function removeForce(force) {
            this.force = this.force - force;
            if(this.force <= 0) {
                this.destroy();
            }
        }

        function destroy() {
            this.force = 0;
            this.deleted = true;
        }
    }

})();