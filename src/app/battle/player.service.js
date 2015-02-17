'use strict';
(function() {
    angular.module('caveBattles.player', ['ngLodash', 'caveBattles.utils.id-generator'])

    .factory('Player', ['lodash', 'IdGenerator',

        function(_, IdGenerator) {

            var PlayerClass = function(options) {
                this.init(options);
            };

            PlayerClass.prototype = {

                init: function(options) {
                    this.id = IdGenerator.getNewId();
                }
            };

            return PlayerClass;
        }
    ]);
})();