'use strict';
(function() {
    angular.module('caveBattles.battle-scheduler', ['caveBattles.utils.ordered-list', 'caveBattles.utils.timer'])

    .constant('BattleEvents', {
        MOVE_ARMY: 'MOVE_ARMY'
    })

    .service('BattleScheduler', ['OrderedList', 'BattleEvents', 'Timer',
        function(OrderedList, BattleEvents, Timer) {

            var eventsHappeningNow = new OrderedList({orderBy: 'timeAdded'});
            var scheduledEvents = new OrderedList({orderBy: 'scheduledAdded'});

            var addEvent = function(action, params) {
                //TODO process the action, modify the battle if needed and store:
                //Scheduled event and ongoingEvent
                //There is always a "next action" timeout. IF we changed something in the first action, will have to reschedule

                switch(action) {
                    case BattleEvents.MOVE_ARMY:
                        moveArmyAction(action, params);
                        break;
                    default:
                        break;
                }
            };

            var moveArmyAction = function(action, params) {
                //We get a new army with the required forces
                var newArmy = params.battle.getPartOfArmy(params.army, params.forceToTake);
                if(newArmy) {
                    eventsHappeningNow.add({
                        timeAdded: Timer.getTime(),
                        action: action,
                        army: newArmy,
                        destinationNode: params.destinationNode
                    });
                    addScheduledEvent({
                        scheduledTime: Timer.getTime() + newArmy.timeToGetToDestination(params.destinationNode),
                        action: action,
                        army: newArmy,
                        destinationNode: params.destinationNode
                    });
                    
                }
            };

            var addScheduledEvent = function(event) {
                //TODO: check if it is the next one to call, and in that case reinit the timeout
                scheduledEvents.push(event);
            };


            var updateBattleInfo = function(battleInfo) {
                //TODO go through the events happening now and update the battle
                console.log(battleInfo);
            };

            return {
                addEvent: addEvent,
                updateBattleInfo: updateBattleInfo
            };
        }
    ]);
})();