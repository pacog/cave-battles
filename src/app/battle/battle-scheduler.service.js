(function() {
    'use strict';

    angular.module('caveBattles.battle-scheduler', [
        'caveBattles.utils.ordered-list',
        'caveBattles.battle-actions-factory',
        'caveBattles.utils.timer',
        'caveBattles.battle-events'
    ])

    .factory('BattleScheduler', ['$timeout', '$interval', 'OrderedList', 'BattleEvents', 'BattleActionsFactory', 'Timer',
        function($timeout, $interval, OrderedList, BattleEvents, BattleActionsFactory, Timer) {
            var service = {
                restart: restart,
                addEvent: addEvent,
                updateBattleInfo: updateBattleInfo,
                fastForwardToFirstEvent: fastForwardToFirstEvent,
                executeFirstElementInList: executeFirstElementInList
            };

            var eventsHappeningNow;
            var scheduledEvents;
            var currentTimeout;

            return service;

            function restart() {
                Timer.restart();
                eventsHappeningNow = new OrderedList({orderBy: 'timeAdded'});
                scheduledEvents = new OrderedList({orderBy: 'scheduledFor'});
                currentTimeout = null;
            }

            function addEvent(action, params) {
                var actionEvents = BattleActionsFactory.getAction(action, params);
                for(var i=0; i < actionEvents.ongoingEvents.length; i++) {
                    eventsHappeningNow.add(actionEvents.ongoingEvents[i]);
                }
                for(i=0; i < actionEvents.scheduledEvents.length; i++) {
                    scheduledEvents.add(actionEvents.scheduledEvents[i]);
                }
                resetScheduleTimeout();
            }

            function updateBattleInfo() {
                eventsHappeningNow.forEach(function(event) {
                    event.update();
                });
            }

            function resetScheduleTimeout() {
                if(currentTimeout) {
                    $timeout.cancel(currentTimeout);
                }
                if(scheduledEvents.firstElement) {
                    var timeToExecute = scheduledEvents.firstElement.element.scheduledFor - Timer.getTime();
                    if(timeToExecute <= 0) {
                        timeToExecute = 0;
                    }
                    currentTimeout = $timeout(executeFirstElementInListAndReschedule, timeToExecute);
                }
            }

            function executeFirstElementInListAndReschedule() {
                executeFirstElementInList();
                resetScheduleTimeout();
            }

            function executeFirstElementInList() {
                var relatedEvents = scheduledEvents.firstElement.element.relatedOngoingEvents;
                if(relatedEvents) {
                    for(var i=0; i<relatedEvents.length; i++) {
                        eventsHappeningNow.remove(relatedEvents[i]);
                    }
                }
                scheduledEvents.firstElement.element.execute();
                scheduledEvents.pop();
            }

            function fastForwardToFirstEvent() {
                Timer.setTime(scheduledEvents.firstElement.element.scheduledFor);
            }
        }
    ]);
})();