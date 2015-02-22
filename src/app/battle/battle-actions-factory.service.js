'use strict';
(function() {
    angular.module('caveBattles.battle-actions-factory', ['caveBattles.utils.timer'])

    .constant('BattleEvents', {
        // army, forceToTake (optional), destinationNode
        MOVE_ARMY: 'MOVE_ARMY',
        FILL_NODES: 'FILL_NODES'
    })


    .factory('MoveArmyActionOnGoing', function(Timer) {

        var MoveArmyActionOnGoingClass = function(params) {
            this.init(params);
        };

        MoveArmyActionOnGoingClass.prototype = {
            init: function(params) {
                this.timeAdded = Timer.getTime();
                this.army = params.army;
                this.destinationNode = params.destinationNode;
                this.progress = params.progress || 0;
            },
            update: function() {
                var currentTime = Timer.getTime();
                this.army.updatePosition(currentTime - this.timeAdded, this.destinationNode);
            }
        };

        return MoveArmyActionOnGoingClass;
    })

    .factory('MoveArmyActionScheduled', function(Timer) {

        var MoveArmyActionScheduledClass = function(params) {
            this.init(params);
        };

        MoveArmyActionScheduledClass.prototype = {
            init: function(params) {
                this.relatedOngoingEvents = params.relatedOngoingEvents;
                this.army = params.army;
                this.scheduledFor = Timer.getTime() + this.army.timeToGetToDestination(params.destinationNode)*1000;
                this.destinationNode = params.destinationNode;
            },
            execute: function() {
                this.destinationNode.handleArmyArriving(this.army);
            }
        };

        return MoveArmyActionScheduledClass;
    })

    .factory('FillNodesActionScheduled', function(Timer) {

        var FillNodesActionScheduledClass = function(params) {
            this.init(params);
        };

        FillNodesActionScheduledClass.prototype = {
            init: function(params) {
                this.relatedOngoingEvents = params.relatedOngoingEvents;
                this.nodes = params.nodes;
                this.scheduledFor = Timer.getTime();
            },
            execute: function() {
                angular.forEach(this.nodes, function(node) {
                    node.fillNode();
                });
            }
        };

        return FillNodesActionScheduledClass;
    })

    .factory('MoveArmyAction', function(MoveArmyActionOnGoing, MoveArmyActionScheduled) {

        var MoveArmyActionClass = function(params) {
            this.init(params);
        };

        MoveArmyActionClass.prototype = {
            init: function(params) {
                this.ongoingEvents = [];
                this.scheduledEvents = [];
                if(params.army && params.army.force) {
                    this.ongoingEvents.push(new MoveArmyActionOnGoing({
                        army: params.army,
                        destinationNode: params.destinationNode
                    }));
                    this.scheduledEvents.push(new MoveArmyActionScheduled({
                        army: params.army,
                        destinationNode: params.destinationNode,
                        relatedOngoingEvents: this.ongoingEvents
                    }));
                }
            }
        };

        return MoveArmyActionClass;
    })

    .factory('FillNodesAction', function(FillNodesActionScheduled) {

        var FillNodesActionClass = function(params) {
            this.init(params);
        };

        FillNodesActionClass.prototype = {
            init: function(params) {
                this.ongoingEvents = [];
                this.scheduledEvents = [];

                this.scheduledEvents.push(new FillNodesActionScheduled({
                    nodes: params.nodes,
                    relatedOngoingEvents: this.ongoingEvents
                }));
            }
        };

        return FillNodesActionClass;
    })


    .factory('BattleActionsFactory', ['BattleEvents', 'MoveArmyAction', 'FillNodesAction',

        function(BattleEvents, MoveArmyAction, FillNodesAction) {

            var getAction = function(action, params) {
                switch(action) {
                    case BattleEvents.MOVE_ARMY:
                        return new MoveArmyAction(params);
                    case BattleEvents.FILL_NODES:
                        return new FillNodesAction(params);
                    default:
                        break;
                }
            };

            return {
                getAction: getAction
            };
        }
    ]);
})();