(function() {
    'use strict';
    angular.module('caveBattles.actions.move-army-ongoing', [
        'caveBattles.utils.timer'
    ])
        .factory('MoveArmyActionOnGoing', MoveArmyActionOnGoing);

    function MoveArmyActionOnGoing(Timer) {

        var MoveArmyActionOnGoingClass = function(params) {
            this.init(params);
        };

        MoveArmyActionOnGoingClass.prototype = {
            init: init,
            update: update
        };

        return MoveArmyActionOnGoingClass;

        function init(params) {
            this.timeAdded = Timer.getTime();
            this.army = params.army;
            this.destinationNode = params.destinationNode;
            this.progress = params.progress || 0;
        }

        function update() {
            var currentTime = Timer.getTime();
            this.army.updatePosition(currentTime - this.timeAdded, this.destinationNode);
        }
    }
})();