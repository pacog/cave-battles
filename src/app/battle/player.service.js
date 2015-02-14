'use strict';
(function() {
    angular.module('caveBattles.player', ['ngLodash', 'caveBattles.utils.id-generator', 'caveBattles.army'])

    .factory('Player', ['lodash', 'IdGenerator', 'Army',

        function(_, IdGenerator, Army) {

            var PlayerClass = function(options) {
                this.init(options);
            };

            PlayerClass.prototype = {

                init: function(options) {
                    this.id = IdGenerator.getNewId();
                    this.armies = [];
                    this.armies.push(new Army({
                        node: options.initialNode,
                        force: options.initialForce
                    }));
                }
            };

            return PlayerClass;
        }
    ]);
})();