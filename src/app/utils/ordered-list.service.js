'use strict';
(function() {
    angular.module('caveBattles.utils.ordered-list', [])

    .factory('OrderedList', [

        function() {

            var OrderedListClass = function(options) {
                this.init(options);
            };

            OrderedListClass.prototype = {

                init: function(options) {
                    if(options && options.orderBy) {
                        this.orderBy = options.orderBy;
                    } else {
                        this.orderBy = 'time';
                    }
                    this.firstElement = null;
                    this._currentSize = 0;
                },

                add: function(element) {
                    if(!this.firstElement) {
                        this.firstElement = {
                            element: element,
                            next: null
                        };
                        this._currentSize++;
                        return;
                    }

                    var lastCheckedElement = null;
                    var nextElementToCheck = this.firstElement;
                    while(nextElementToCheck) {
                        if(nextElementToCheck.element[this.orderBy] > element[this.orderBy]) {
                            var newListItem = {
                                element: element,
                                next: nextElementToCheck
                            };
                            if(lastCheckedElement) {
                                lastCheckedElement.next = newListItem;
                            } else {
                                this.firstElement = newListItem;
                            }
                            this._currentSize++;
                            return;
                        } else {
                            if(nextElementToCheck.next) {
                                //Keep going
                                lastCheckedElement = nextElementToCheck;
                                nextElementToCheck = nextElementToCheck.next;
                            } else {
                                //Add it at the end
                                var addedAtTheEnd = {
                                    element: element,
                                    next: null
                                };
                                nextElementToCheck.next = addedAtTheEnd;
                                this._currentSize++;
                                return;
                            }
                        }
                    }
                },

                pop: function() {
                    var result = null;
                    if(this.firstElement) {
                        result = this.firstElement.element;
                        this.firstElement = this.firstElement.next;
                    }
                    this._currentSize--;
                    return result;
                },

                remove: function(element) {
                    if(!element) {
                        return false;
                    }
                    var currentlyChecking = this.firstElement;
                    var lastChecked = null;
                    while(currentlyChecking) {
                        if(currentlyChecking.element === element) {
                            if(!lastChecked) {
                                this.firstElement = currentlyChecking.next;
                            } else {
                                lastChecked.next = currentlyChecking.next;
                            }
                            this._currentSize--;
                            return currentlyChecking.element;
                        } else {
                            lastChecked = currentlyChecking;
                            currentlyChecking = currentlyChecking.next;
                        }
                    }
                    return false;
                },

                size: function() {
                    return this._currentSize;
                }
            };

            return OrderedListClass;
        }
    ]);
})();