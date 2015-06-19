(function() {
    'use strict';

    angular.module('caveBattles.battle-view.node-controller', [
        'caveBattles.battle-handler'
    ])

    .controller('NodeController', NodeController);

    function NodeController(BattleHandler) {
        var vm = this;

        vm.nodeClicked = nodeClicked;
        vm.getTopFill = getTopFill;

        function nodeClicked($event) {
            $event.stopPropagation();
            if(vm.nodeInfo.canBeReachedBySelectedNode) {
                BattleHandler.requestNodeForcesToGoToNode(vm.nodeInfo);
            } else {
                BattleHandler.requestSelection(vm.nodeInfo);
            }
        }

        function getTopFill() {
            if(!vm.nodeInfo.partialOwner) {
                return 100;
            }
            return 100*(1 - (vm.nodeInfo.ownerStrength/vm.nodeInfo.DEFAULT_NODE_STRENGTH));
        }
    }
})();
