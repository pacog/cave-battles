'use strict';
(function() {
    angular.module('caveBattles.battle-scheduler', ['caveBattles.utils.ordered-list', 'caveBattles.battle-actions-factory'])

    .service('BattleScheduler', ['OrderedList', 'BattleEvents', 'BattleActionsFactory',
        function(OrderedList, BattleEvents, BattleActionsFactory) {

            var eventsHappeningNow = new OrderedList({orderBy: 'timeAdded'});
            var scheduledEvents = new OrderedList({orderBy: 'scheduledFor'}); //TODO converto to class that handlesa all

            var addEvent = function(action, params) {
                var actionEvents = BattleActionsFactory.getAction(action, params);
                for(var i=0; i < actionEvents.ongoingEvents.length; i++) {
                    eventsHappeningNow.add(actionEvents.ongoingEvents[i]);
                }
                for(i=0; i < actionEvents.scheduledEvents.length; i++) {
                    scheduledEvents.add(actionEvents.scheduledEvents[i]);
                }
            };

            var updateBattleInfo = function() {
                eventsHappeningNow.forEach(function(event) {
                    event.update();
                });
            };

            return {
                addEvent: addEvent,
                updateBattleInfo: updateBattleInfo
            };
        }
    ]);
})();