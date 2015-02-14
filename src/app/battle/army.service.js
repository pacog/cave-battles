'use strict';
(function() {
    angular.module('caveBattles.army', ['ngLodash'])

    .factory('Army', ['lodash',

        function(_) {

            var ArmyClass = function(options) {
                _.assign(this, options);
            };

            return ArmyClass;
        }
    ]);
})();