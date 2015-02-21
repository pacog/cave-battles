'use strict';
(function() {
    angular.module('caveBattles.battle-actions-factory', ['caveBattles.utils.timer'])

    .constant('BattleEvents', {
        // army, forceToTake (optional), destinationNode
        MOVE_ARMY: 'MOVE_ARMY'
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
                
            }
        };

        return MoveArmyActionScheduledClass;
    })

    .factory('MoveArmyAction', function(MoveArmyActionOnGoing, MoveArmyActionScheduled) {

        var MoveArmyActionClass = function(params) {
            this.init(params);
        };

        MoveArmyActionClass.prototype = {
            init: function(params) {
                this.ongoingEvents = [];
                this.scheduledEvents = [];
                //We get a new army with the required forces
                var newArmy = params.battle.getPartOfArmy(params.army, params.forceToTake);
                if(newArmy) {
                    this.ongoingEvents.push(new MoveArmyActionOnGoing({
                        army: newArmy,
                        destinationNode: params.destinationNode
                    }));
                    this.scheduledEvents.push(new MoveArmyActionScheduled({
                        army: newArmy,
                        destinationNode: params.destinationNode,
                        relatedOngoingEvents: this.ongoingEvents
                    }));
                }
            }
        };

        return MoveArmyActionClass;
    })



    .factory('BattleActionsFactory', ['BattleEvents', 'MoveArmyAction',

        function(BattleEvents, MoveArmyAction) {

            var getAction = function(action, params) {
                switch(action) {
                    case BattleEvents.MOVE_ARMY:
                        return new MoveArmyAction(params);
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