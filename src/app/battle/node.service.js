'use strict';
(function() {
    angular.module('caveBattles.node', [
        'ngLodash',
        'caveBattles.battle.constants'
    ])

    .factory('Node', ['lodash', 'MAX_FORCE_PER_NODE', 'INCREMENT_PER_FILL', 'DEFAULT_NODE_STRENGTH',

        function(_, MAX_FORCE_PER_NODE, INCREMENT_PER_FILL, DEFAULT_NODE_STRENGTH) {

            var NodeClass = function(options, battleModel) {
                _.assign(this, options);
                this.currentOwner = null;
                this.partialOwner = null;
                this._setOwnerStrength(0);
                this.battleModel = battleModel;
            };

            NodeClass.prototype = {

                DEFAULT_NODE_STRENGTH: DEFAULT_NODE_STRENGTH,

                fillNode: function() {
                    if(!!this.currentOwner) {
                        this._setOwnerStrength(this.ownerStrength + INCREMENT_PER_FILL);
                    }
                },

                handleArmyArriving: function(army) {

                    if(army.player === this.currentOwner) {
                        //Army's player already is the owner
                        this._setOwnerStrength(this.ownerStrength + army.force);
                        army.destroy();

                    } else if (army.player === this.partialOwner) {
                        //Army's player already partial owner
                        if(army.force >= (this.DEFAULT_NODE_STRENGTH - this.ownerStrength)) {
                            //Army's player can become real owner
                            this._setArmyAsOwner(army, this.DEFAULT_NODE_STRENGTH - this.ownerStrength);
                        } else {
                            //Army's player cannot yet become real owner
                            this._setOwnerStrength(this.ownerStrength + army.force);
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

                canReachNode: function(otherNode) {
                    if(!otherNode) {
                        return false;
                    }
                    for(var i=0; i<this.battleModel.model.tunnels.length; i++) {
                        if(this.battleModel.model.tunnels[i].connectsNodes(this, otherNode)) {
                            return true;
                        }
                    }
                    return false;
                },

                isEmpty: function() {
                    return !this.currentOwner;
                },

                belongsToPlayer: function(player) {
                    return this.currentOwner === player;
                },

                canBeConqueredWithForce: function(player, force) {
                    if(player === this.currentOwner) {
                        return true;
                    } else if (player === this.partialOwner) {
                        //Army's player already partial owner
                        if(force >= (this.DEFAULT_NODE_STRENGTH - this.ownerStrength)) {
                            return true;
                        }
                    } else if(!this.currentOwner && !this.partialOwner) {
                        if(force >= this.DEFAULT_NODE_STRENGTH) {
                            return true;
                        }
                    } else if(!!this.currentOwner && (this.currentOwner !== player)) {
                        if(force > this.ownerStrength) {
                            return true;
                        }
                    } else if(!!this.partialOwner && (this.partialOwner !== player)) {
                        if(force > this.ownerStrength) {
                            return true;
                        }
                    }
                    return false;
                },

                isFull: function() {
                    if(!!this.currentOwner) {
                        return this.ownerStrength >= MAX_FORCE_PER_NODE;
                    }
                    return false;
                },

                getEnemiesAround: function(player, nodes) {
                    var connectedNodes = this.getNodesAround(nodes);
                    var enemiesAround = 0;
                    for(var i=0; i<connectedNodes.length; i++) {
                        if(!connectedNodes[i].isEmpty() && !connectedNodes[i].belongsToPlayer(player)) {
                            enemiesAround++;
                        }
                    }
                    return enemiesAround;
                },

                getEmptyNodesAround: function(nodes) {
                    var connectedNodes = this.getNodesAround(nodes);
                    var emptyNodesAround = 0;
                    for(var i=0; i<connectedNodes.length; i++) {
                        if(connectedNodes[i].isEmpty()) {
                            emptyNodesAround++;
                        }
                    }
                    return emptyNodesAround;
                },

                getNodesAround: function(nodes) {
                    var result = [];
                    for(var nodeId in nodes) {
                        if(this.canReachNode(nodes[nodeId])) {
                            result.push(nodes[nodeId]);
                        }
                    }
                    return result;
                },

                updateCanBeReachedBySelectedNode: function(node) {
                    this.canBeReachedBySelectedNode = false;
                    if(node && this.canReachNode(node)) {
                        this.canBeReachedBySelectedNode = true;
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
                        this._setOwnerStrength(army.force);
                        army.destroy();
                    }
                },

                _handleArmyArrivingAtEnemyNode: function(army) {
                    if(army.force > this.ownerStrength) {
                        //New army can remove it
                        army.force = army.force - this.ownerStrength;
                        this._setOwnerStrength(0);
                        this.currentOwner = null;
                        //And now start as if it was an empty node
                        this._handleArmyArrivingAtEmptyNode(army);
                    } else {
                        this._setOwnerStrength(this.ownerStrength - army.force);
                        army.destroy();
                    }
                },

                _setArmyAsOwner: function(army, strength) {
                    if(!strength || strength < 0) {
                        strength = 0;
                    }
                    this._setOwnerStrength(strength);
                    this.currentOwner = army.player;
                    this.partialOwner = null;
                    army.destroy();
                },

                _setOwnerStrength: function(newStrength) {
                    this.ownerStrength = Math.min(newStrength, MAX_FORCE_PER_NODE);
                }
            };

            return NodeClass;
        }
    ]);
})();