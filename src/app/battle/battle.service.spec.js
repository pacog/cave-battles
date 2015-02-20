'use strict';

describe('battle model', function(){

    var Battle;
    var battleInfo;
    beforeEach(module('caveBattles.battle'));

    beforeEach(inject(function(_Battle_) {
        Battle = _Battle_;
        var battleConfig = {
            map: {
                nodes: [{
                    id: '1',
                    position: {
                        x: 10,
                        y: 45
                    }
                }],
                tunnels: [],
                players: [{
                    initialNode: '1',
                    initialForce: 20
                }]
            }
        };
        Battle.init(battleConfig);
        battleInfo = Battle.getBattleInfo();
    }));

    it('should have a service', inject(function() {
        expect(Battle).toBeTruthy();
    }));

    describe('getPartOfArmy function', function() {

        it('should get 50% of army if no param is asked', function() {
            var originArmy = battleInfo.armies[0];
            var newArmy = Battle.getPartOfArmy(originArmy);
            expect(newArmy.force).toBe(10);
            expect(originArmy.force).toBe(10);
        });

        it('should get a oart of army correctly', function() {
            var originArmy = battleInfo.armies[0];
            var newArmy = Battle.getPartOfArmy(originArmy, 5);
            expect(newArmy.force).toBe(5);
            expect(originArmy.force).toBe(15);
        });

        it('should get nothing if it asks for nothing', function() {
            var originArmy = battleInfo.armies[0];
            var newArmy = Battle.getPartOfArmy(originArmy, 0);
            expect(newArmy).toBe(false);
            expect(originArmy.force).toBe(20);
        });

        it('should get nothing if there is nothing to get', function() {
            var originArmy = battleInfo.armies[0];
            originArmy.force = 0;
            var newArmy = Battle.getPartOfArmy(originArmy);
            expect(newArmy).toBe(false);
            expect(originArmy.force).toBe(0);
        });

        it('should get all if it asks for a lot', function() {
            var originArmy = battleInfo.armies[0];
            var newArmy = Battle.getPartOfArmy(originArmy, 21);
            expect(newArmy.force).toBe(20);
            expect(originArmy.force).toBe(0);
            expect(originArmy.deleted).toBe(true);
        });
    });

    describe('deleteArmy function', function() {
        it('should delete an army', function() {
            var originArmy = battleInfo.armies[0];
            expect(battleInfo.armies.length).toBe(1);
            expect(!originArmy.deleted).toBe(true);
            Battle.deleteArmy(originArmy);
            expect(battleInfo.armies.length).toBe(0);
            expect(originArmy.deleted).toBe(true);
        });
    });
});
