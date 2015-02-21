'use strict';

describe('node model', function(){

    var Node, Army, Player;

    beforeEach(module('caveBattles.node'));
    beforeEach(module('caveBattles.army'));
    beforeEach(module('caveBattles.player'));

    beforeEach(inject(function(_Node_, _Army_, _Player_) {
        Node = _Node_;
        Army = _Army_;
        Player = _Player_;
    }));

    it('should have a service', inject(function() {
        expect(Node).toBeTruthy();
    }));

    describe('handle army arrivals', function() {

        var node, originNode, player, otherPlayer, army;

        beforeEach(inject(function() {
            node = new Node({
                id: '1',
                position: {
                    x: 10,
                    y: 45
                }
            });
            originNode = new Node({
                id: '2',
                position: {
                    x: 20,
                    y: 25
                }
            });
            player = new Player({
                initialNode: '1',
                initialForce: 20
            });
            otherPlayer = new Player({
                initialNode: '2',
                initialForce: 20
            });
            army = new Army({
                originNode: originNode,
                force: 20,
                player: player
            });
        }));

        it('should be conquered by an army with enough force', inject(function() {
            expect(node.currentOwner).toEqual(null);
            expect(node.partialOwner).toEqual(null);
            expect(node.ownerStrength).toEqual(0);
            node.handleArmyArriving(army);
            expect(node.currentOwner).toBe(player);
            expect(army.force).toBe(0);
            expect(node.ownerStrength).toEqual(20 - node.DEFAULT_NODE_STRENGTH);
            expect(node.partialOwner).toEqual(null);
        }));

        it('should be not conquered by an army with not enough force', inject(function() {
            army.force = 5;
            node.handleArmyArriving(army);
            expect(node.currentOwner).toEqual(null);
            expect(node.partialOwner).toBe(player);
            expect(army.force).toBe(0);
            expect(army.deleted).toBe(true);
            expect(node.ownerStrength).toBe(5);
        }));

        it('should be conquered by an army with exactly enough force', inject(function() {
            army.force = 10;
            node.handleArmyArriving(army);
            expect(node.currentOwner).toEqual(player);
            expect(node.partialOwner).toBe(null);
            expect(army.force).toBe(0);
            expect(army.deleted).toBe(true);
            expect(node.ownerStrength).toBe(0);
        }));

        it('should be conquered by an army when there is other in', inject(function() {
            node.currentOwner = otherPlayer;
            node.ownerStrength = 5;
            node.handleArmyArriving(army);
            expect(node.currentOwner).toEqual(player);
            expect(node.partialOwner).toBe(null);
            expect(army.force).toBe(0);
            expect(!!army.deleted).toBe(true);
            expect(node.ownerStrength).toBe(5);
        }));

        it('should be conquered by an army when there is other in and it has just enough force', inject(function() {
            node.currentOwner = otherPlayer;
            node.ownerStrength = 10;
            node.handleArmyArriving(army);
            expect(node.currentOwner).toEqual(player);
            expect(node.partialOwner).toBe(null);
            expect(army.force).toBe(0);
            expect(!!army.deleted).toBe(true);
            expect(node.ownerStrength).toBe(0);
        }));

        it('should remove some of the existing force', inject(function() {
            node.currentOwner = otherPlayer;
            node.ownerStrength = 30;
            node.handleArmyArriving(army);
            expect(node.currentOwner).toEqual(otherPlayer);
            expect(node.partialOwner).toBe(null);
            expect(army.force).toBe(0);
            expect(!!army.deleted).toBe(true);
            expect(node.ownerStrength).toBe(10);
        }));

        it('should remove all of the existing force, but not enough to remove control', inject(function() {
            node.currentOwner = otherPlayer;
            node.ownerStrength = 20;
            node.handleArmyArriving(army);
            expect(node.currentOwner).toEqual(otherPlayer);
            expect(node.partialOwner).toBe(null);
            expect(army.force).toBe(0);
            expect(!!army.deleted).toBe(true);
            expect(node.ownerStrength).toBe(0);
        }));

        it('should remove all of the existing forceand start gaining control', inject(function() {
            node.currentOwner = otherPlayer;
            node.ownerStrength = 15;
            node.handleArmyArriving(army);
            expect(node.currentOwner).toEqual(null);
            expect(node.partialOwner).toBe(player);
            expect(army.force).toBe(0);
            expect(!!army.deleted).toBe(true);
            expect(node.ownerStrength).toBe(5);
        }));
    });

});