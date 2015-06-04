'use strict';
(function() {
    angular.module('caveBattles.node', ['ngLodash'])

    .factory('Node', ['lodash',

        function(_) {

            var INCREMENT_PER_FILL = 1;

            var NodeClass = function(options) {
                _.assign(this, options);
                this.currentOwner = null;
                this.partialOwner = null;
                this.ownerStrength = 0;
            };

            NodeClass.prototype = {

                DEFAULT_NODE_STRENGTH: 10,

                fillNode: function() {
                    if(!!this.currentOwner) {
                        this.ownerStrength += INCREMENT_PER_FILL;
                    }
                },

                handleArmyArriving: function(army) {

                    if(army.player === this.currentOwner) {
                        //Army's player already is the owner
                        this.ownerStrength += army.force;
                        army.destroy();

                    } else if (army.player === this.partialOwner) {
                        //Army's player already partial owner
                        if(army.force >= (this.DEFAULT_NODE_STRENGTH - this.ownerStrength)) {
                            //Army's player can become real owner
                            this._setArmyAsOwner(army, this.DEFAULT_NODE_STRENGTH - this.ownerStrength);
                        } else {
                            //Army's player cannot yet become real owner
                            this.ownerStrength += army.force;
                            army.destroy();
                        }

                    } else if(!this.currentOwner && !this.partialOwner) {
                        //Nobody else controls the node
                        this._handleArmyArrivingAtEmptyNode(army);
                    } else if(!!this.currentOwner && (this.currentOwner !== army.player)) {
                        //Army arriving at a completely enemy node
                        this._handleArmyArrivingAtEnemyNode(army);
                    } else if(!!this.partialOwner && (this.partialOwner !== army.player)) {
                        //Army arriving at a partial enemy node
                        this._handleArmyArrivingAtEnemyNode(army);
                    }
                },

                _handleArmyArrivingAtEmptyNode: function(army) {
                    //No owner yet
                    if(army.force >= this.DEFAULT_NODE_STRENGTH) {
                        //Army can conquer
                        this._setArmyAsOwner(army, army.force - this.DEFAULT_NODE_STRENGTH);
                    } else {
                        //Army cannot conquer
                        this.partialOwner = army.player;
                        this.ownerStrength = army.force;
                        army.destroy();
                    }
                },

                _handleArmyArrivingAtEnemyNode: function(army) {
                    if(army.force > this.ownerStrength) {
                        //New army can remove it
                        army.force = army.force - this.ownerStrength;
                        this.ownerStrength = 0;
                        this.currentOwner = null;
                        //And now start as if it was an empty node
                        this._handleArmyArrivingAtEmptyNode(army);
                    } else {
                        this.ownerStrength -= army.force;
                        army.destroy();
                    }
                },

                _setArmyAsOwner: function(army, strength) {
                    if(!strength || strength < 0) {
                        strength = 0;
                    }
                    this.ownerStrength = strength;
                    this.currentOwner = army.player;
                    this.partialOwner = null;
                    army.destroy();
                }
            };

            return NodeClass;
        }
    ]);
})();