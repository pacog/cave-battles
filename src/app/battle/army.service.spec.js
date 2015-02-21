'use strict';

describe('army model', function(){

    var Army;
    var newArmy;
    beforeEach(module('caveBattles.army'));

    beforeEach(inject(function(_Army_) {
        Army = _Army_;
    }));

    beforeEach(inject(function() {
        newArmy = new Army({
            node: {},
            force: 10,
            player: {}
        });
    }));

    it('should have a service', inject(function() {
        expect(Army).toBeTruthy();
    }));

    it('can be created', inject(function() {
        expect(newArmy).toBeTruthy();
    }));

    it('can be created as a moving army', inject(function() {
        expect(newArmy).toBeTruthy();
    }));

    it('can return timeToGetToDestination correctly', inject(function() {
        newArmy = new Army({
            originNode: {
                position: {
                    x: 0,
                    y: 0
                }
            },
            force: 10,
            player: {}
        });
        var destination = {
            position: {
                x: 0,
                y: 1
            }
        };
        expect(newArmy.timeToGetToDestination(destination)).toBe(1/newArmy.DEFAULT_SPEED);
    }));

    describe('removeForce', function(){
        it('removes normal forces', inject(function() {
            newArmy.removeForce(1);
            expect(newArmy.force).toBe(9);
            expect(!!newArmy.deleted).toBe(false);
        }));

        it('removes 0 forces', inject(function() {
            newArmy.removeForce(0);
            expect(newArmy.force).toBe(10);
            expect(!!newArmy.deleted).toBe(false);
        }));

        it('removes all forces', inject(function() {
            newArmy.removeForce(10);
            expect(newArmy.force).toBe(0);
            expect(!!newArmy.deleted).toBe(true);
        }));

        it('removes more than all forces', inject(function() {
            newArmy.removeForce(20);
            expect(newArmy.force).toBe(0);
            expect(!!newArmy.deleted).toBe(true);
        }));
    });

    describe('destroy', function(){
        it('should work', inject(function() {
            newArmy.destroy();
            expect(newArmy.force).toBe(0);
            expect(!!newArmy.deleted).toBe(true);
        }));
    });

});
