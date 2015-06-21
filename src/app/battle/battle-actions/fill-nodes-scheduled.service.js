(function() {
    'use strict';

    angular.module('caveBattles.actions.fill-nodes-scheduled', [
        'caveBattles.utils.timer',
        'caveBattles.battle-model'
    ])
        .factory('FillNodesActionScheduled', FillNodesActionScheduled);

    function FillNodesActionScheduled(Timer, BattleModel) {

        var FillNodesActionScheduledClass = function(params) {
            this.init(params);
        };

        FillNodesActionScheduledClass.prototype = {
            init: init,
            execute: execute
        };

        return FillNodesActionScheduledClass;

        function init(params) {
            this.relatedOngoingEvents = params.relatedOngoingEvents;
            this.scheduledFor = Timer.getTime();
        }

        function execute() {
            angular.forEach(BattleModel.model.nodes, function(node) {
                node.fillNode();
            });
        }
    }
})();