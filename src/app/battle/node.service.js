'use strict';
(function() {
    angular.module('caveBattles.node', ['ngLodash'])

    .factory('Node', ['lodash',

        function(_) {

            var NodeClass = function(options) {
                _.assign(this, options);
            };

            return NodeClass;
        }
    ]);
})();