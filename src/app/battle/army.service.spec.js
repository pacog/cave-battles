'use strict';

describe('army model', function(){

    var Army;

    beforeEach(module('caveBattles.army'));

    beforeEach(inject(function(_Army_) {
        Army = _Army_;
    }));

    it('should have a service', inject(function() {
        expect(Army).toBeTruthy();
    }));

    it('can be created', inject(function() {
        var newArmy = new Army({
            node: {},
            force: 10,
            player: {}
        });
        expect(newArmy).toBeTruthy();
    }));

    it('can be created as a moving army', inject(function() {
        var newArmy = new Army({
            originNode: {},
            force: 10,
            player: {}
        });
        expect(newArmy).toBeTruthy();
    }));

    it('can return timeToGetToDestination correctly', inject(function() {
        var newArmy = new Army({
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

});
