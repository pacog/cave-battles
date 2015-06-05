'use strict';
(function() {
    angular.module('caveBattles.battle-actions-factory', ['caveBattles.utils.timer', 'caveBattles.simple-ai'])

    .constant('BattleEvents', {
        // army, forceToTake (optional), destinationNode
        MOVE_ARMY: 'MOVE_ARMY',
        // list of all nodes
        FILL_NODES: 'FILL_NODES',
        // list of all nodes
        PLAN_AI: 'PLAN_AI'
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


    .factory('PlanAIActionScheduled', function(Timer, SimpleAI) {

        var PlanAIActionScheduledClass = function(params) {
            this.init(params);
        };

        PlanAIActionScheduledClass.prototype = {
            init: function(params) {
                this.relatedOngoingEvents = params.relatedOngoingEvents;
                this.nodes = params.nodes;
                this.players = params.players;
                this.scheduler = params.scheduler;
                this.scheduledFor = Timer.getTime();
            },
            execute: function() {
                var self = this;
                angular.forEach(this.players, function(player) {
                    if(player.isAI()) {
                        var newAction = SimpleAI.getNextAction(player, self.nodes);
                        if(newAction) { //TODO: create empty action to avoid this if
                            this.scheduler.addEvent(newAction.name, newAction.params);
                        }
                    }
                });
            }
        };

        return PlanAIActionScheduledClass;
    })

    .factory('PlanAIAction', function(PlanAIActionScheduled) {

        var PlanAIActionClass = function(params) {
            this.init(params);
        };

        PlanAIActionClass.prototype = {
            init: function(params) {
                this.ongoingEvents = [];
                this.scheduledEvents = [];

                this.scheduledEvents.push(new PlanAIActionScheduled({
                    nodes: params.nodes,
                    players: params.players,
                    relatedOngoingEvents: this.ongoingEvents,
                    scheduler: params.scheduler
                }));
            }
        };

        return PlanAIActionClass;
    })

    .factory('BattleActionsFactory', ['BattleEvents', 'MoveArmyAction', 'FillNodesAction', 'PlanAIAction',

        function(BattleEvents, MoveArmyAction, FillNodesAction, PlanAIAction) {

            var getAction = function(action, params) {
                switch(action) {
                    case BattleEvents.MOVE_ARMY:
                        return new MoveArmyAction(params);
                    case BattleEvents.FILL_NODES:
                        return new FillNodesAction(params);
                    case BattleEvents.PLAN_AI:
                        return new PlanAIAction(params);
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