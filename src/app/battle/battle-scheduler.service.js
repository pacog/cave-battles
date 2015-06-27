(function() {
    'use strict';

    angular.module('caveBattles.battle-scheduler', [
        'caveBattles.utils.ordered-list',
        'caveBattles.battle-actions-factory',
        'caveBattles.utils.timer',
        'caveBattles.battle-events'
    ])

    .service('BattleScheduler', ['$timeout', '$interval', 'OrderedList', 'BattleEvents', 'BattleActionsFactory', 'Timer',
        function($timeout, $interval, OrderedList, BattleEvents, BattleActionsFactory, Timer) {

            var service = {
                addEvent: addEvent,
                addRecurringEvent: addRecurringEvent,
                updateBattleInfo: updateBattleInfo,
                fastForwardToFirstEvent: fastForwardToFirstEvent
            };
            var eventsHappeningNow = new OrderedList({orderBy: 'timeAdded'});
            var scheduledEvents = new OrderedList({orderBy: 'scheduledFor'}); //TODO converto to class that handlesa all
            var currentTimeout = null;

            return service;

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

            function addRecurringEvent(action, params, everyMilliseconds) {
                $interval(function() {
                    addEvent(action, params);
                }, everyMilliseconds);
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
                    currentTimeout = $timeout(executeFirstElementInList, timeToExecute);
                }
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
                resetScheduleTimeout();
            }

            function fastForwardToFirstEvent() {
                debugger;
            }
        }
    ]);
})();