(function() {
    'use strict';

    angular.module('caveBattles.ai', [
        'caveBattles.simple-ai',
        'caveBattles.not-so-simple-ai',
        'caveBattles.totally-random-ai'
    ])
        .factory('AI', AI);

    function AI(TotallyRandomAI, SimpleAI, NotSoSimpleAI) {
        var factory = {
            getAIs: getAIs
        };

        return factory;

        function getAIs() {
            return [TotallyRandomAI, SimpleAI, NotSoSimpleAI];
        }
    }
})();