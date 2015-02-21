'use strict';
(function() {
    angular.module('caveBattles.battle-scheduler', ['caveBattles.utils.ordered-list', 'caveBattles.battle-actions-factory', 'caveBattles.utils.timer'])

    .service('BattleScheduler', ['$timeout', 'OrderedList', 'BattleEvents', 'BattleActionsFactory', 'Timer',
        function($timeout, OrderedList, BattleEvents, BattleActionsFactory, Timer) {

            var eventsHappeningNow = new OrderedList({orderBy: 'timeAdded'});
            var scheduledEvents = new OrderedList({orderBy: 'scheduledFor'}); //TODO converto to class that handlesa all
            var currentTimeout = null;

            var addEvent = function(action, params) {
                var actionEvents = BattleActionsFactory.getAction(action, params);
                for(var i=0; i < actionEvents.ongoingEvents.length; i++) {
                    eventsHappeningNow.add(actionEvents.ongoingEvents[i]);
                }
                for(i=0; i < actionEvents.scheduledEvents.length; i++) {
                    scheduledEvents.add(actionEvents.scheduledEvents[i]);
                }
                resetScheduleTimeout();
            };

            var updateBattleInfo = function() {
                eventsHappeningNow.forEach(function(event) {
                    event.update();
                });
            };

            var resetScheduleTimeout = function() {
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
            };

            var executeFirstElementInList = function() {
                var relatedEvents = scheduledEvents.firstElement.element.relatedOngoingEvents;
                if(relatedEvents) {
                    for(var i=0; i<relatedEvents.length; i++) {
                        eventsHappeningNow.remove(relatedEvents[i]);
                    }
                }
                scheduledEvents.firstElement.element.execute();
                scheduledEvents.pop();
                resetScheduleTimeout();

            };

            return {
                addEvent: addEvent,
                updateBattleInfo: updateBattleInfo
            };
        }
    ]);
})();