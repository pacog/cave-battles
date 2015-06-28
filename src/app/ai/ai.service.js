(function() {
    'use strict';

    angular.module('caveBattles.ai', [
        'caveBattles.simple-ai',
        'caveBattles.not-so-simple-ai'
    ])
        .factory('AI', AI);

    function AI(SimpleAI, NotSoSimpleAI) {
        var factory = {
            getAIs: getAIs
        };

        return factory;

        function getAIs() {
            return [SimpleAI, NotSoSimpleAI];
        }
    }
})();