'use strict';
(function() {
    angular.module('caveBattles.battle-actions-factory', [
        'caveBattles.utils.timer',
        'caveBattles.simple-ai',
        'caveBattles.battle-model'
    ])

    .constant('BattleEvents', {
        // army, forceToTake (optional), destinationNode
        MOVE_ARMY: 'MOVE_ARMY',
        // list of all nodes
        FILL_NODES: 'FILL_NODES',
        // list of all nodes
        PLAN_AI: 'PLAN_AI',
        //TODO: use this event instead of MOVE_ARMY everywhere
        // originNode, destinatioNode
        MOVE_ARMY_IA: 'MOVE_ARMY_IA'
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

    .factory('FillNodesActionScheduled', function(Timer, BattleModel) {

        var FillNodesActionScheduledClass = function(params) {
            this.init(params);
        };

        FillNodesActionScheduledClass.prototype = {
            init: function(params) {
                this.relatedOngoingEvents = params.relatedOngoingEvents;
                this.scheduledFor = Timer.getTime();
            },
            execute: function() {
                angular.forEach(BattleModel.model.nodes, function(node) {
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

    .factory('MoveArmyIAActionScheduled', function(Timer, BattleEvents, BattleModel) {

        var MoveArmyIAActionScheduledClass = function(params) {
            this.init(params);
        };

        MoveArmyIAActionScheduledClass.prototype = {
            init: function(params) {
                this.relatedOngoingEvents = params.relatedOngoingEvents;
                this.army = params.army;
                this.scheduledFor = Timer.getTime();
                this.destinationNode = params.destinationNode;
                this.originNode = params.originNode;
                this.scheduler = params.scheduler;
            },
            execute: function() {
                var eventToHandleForceMovement = BattleModel.moveForcesBetweenNodesAndGetRelatedEvent(this.originNode, this.destinationNode);
                if(eventToHandleForceMovement) {
                    this.scheduler.addEvent(BattleEvents.MOVE_ARMY, eventToHandleForceMovement);
                }
            }
        };

        return MoveArmyIAActionScheduledClass;
    })

    .factory('MoveArmyIAAction', function(MoveArmyIAActionScheduled) {

        var MoveArmyIAActionClass = function(params) {
            this.init(params);
        };

        MoveArmyIAActionClass.prototype = {
            init: function(params) {
                this.ongoingEvents = [];
                this.scheduledEvents = [];
                if(params.originNode && params.destinationNode) {
                    this.scheduledEvents.push(new MoveArmyIAActionScheduled({
                        originNode: params.originNode,
                        destinationNode: params.destinationNode,
                        scheduler: params.scheduler,
                        relatedOngoingEvents: this.ongoingEvents
                    }));
                }
            }
        };

        return MoveArmyIAActionClass;
    })

    .factory('FillNodesAction', function(FillNodesActionScheduled) {

        var FillNodesActionClass = function(params) {
            this.init(params);
        };

        FillNodesActionClass.prototype = {
            init: function() {
                this.ongoingEvents = [];
                this.scheduledEvents = [];

                this.scheduledEvents.push(new FillNodesActionScheduled({
                    relatedOngoingEvents: this.ongoingEvents
                }));
            }
        };

        return FillNodesActionClass;
    })


    .factory('PlanAIActionScheduled', function(Timer, BattleModel, SimpleAI) {

        var PlanAIActionScheduledClass = function(params) {
            this.init(params);
        };

        PlanAIActionScheduledClass.prototype = {
            init: function(params) {
                this.relatedOngoingEvents = params.relatedOngoingEvents;
                this.scheduler = params.scheduler;
                this.scheduledFor = Timer.getTime();
            },
            execute: function() {
                var self = this;
                angular.forEach(BattleModel.model.players, function(player) {
                    if(player.isAI()) {
                        var newAction = SimpleAI.getNextAction(player, BattleModel.model.nodes);
                        if(newAction) { //TODO: create empty action to avoid this if
                            newAction.params.scheduler = self.scheduler;
                            self.scheduler.addEvent(newAction.name, newAction.params);
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

    .factory('BattleActionsFactory', ['BattleEvents', 'MoveArmyAction', 'FillNodesAction', 'PlanAIAction', 'MoveArmyIAAction',

        function(BattleEvents, MoveArmyAction, FillNodesAction, PlanAIAction, MoveArmyIAAction) {

            var getAction = function(action, params) {
                switch(action) {
                    case BattleEvents.MOVE_ARMY:
                        return new MoveArmyAction(params);
                    case BattleEvents.FILL_NODES:
                        return new FillNodesAction(params);
                    case BattleEvents.PLAN_AI:
                        return new PlanAIAction(params);
                    case BattleEvents.MOVE_ARMY_IA:
                        return new MoveArmyIAAction(params);
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