'use strict';
(function() {
    angular.module('caveBattles.player', ['ngLodash', 'caveBattles.utils.id-generator'])

    .factory('Player', ['lodash', 'IdGenerator',

        function(_, IdGenerator) {

            var TYPE_HUMAN = 'human';

            var PlayerClass = function(options) {

                this.init(options);
            };

            PlayerClass.prototype = {

                init: function(options) {
                    _.assign(this, options);
                    this.id = IdGenerator.getNewId();
                },

                isHuman: function() {
                    return this.type === TYPE_HUMAN;
                }
            };

            return PlayerClass;
        }
    ]);
})();