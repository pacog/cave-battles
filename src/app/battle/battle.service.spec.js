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

});
