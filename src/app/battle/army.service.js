'use strict';
(function() {
    angular.module('caveBattles.army', [])

    .factory('Army', [

        function() {

            var ArmyClass = function(options) {
                this.player = options.player;
                this.position = angular.copy(options.node.position);
                this.node = options.node;
            };

            return ArmyClass;
        }
    ]);
})();