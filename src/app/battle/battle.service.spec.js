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
                },{
                    id: '2',
                    position: {
                        x: 20,
                        y: 25
                    }
                }],
                tunnels: [{
                    from: '1',
                    to: '2'
                }],
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

    it('should create the nodes correctly with the initial force', inject(function() {
        var node1 = battleInfo.nodes['1'];
        expect(node1.currentOwner).toBe(battleInfo.players[0]);
        expect(node1.ownerStrength).toBe(20);
    }));

    describe('requestNodeForcesToGoToNode function', function(){

        it('should create an army with correct params and reduce node forces', inject(function() {
            Battle.requestSelection(battleInfo.nodes['1']);
            expect(battleInfo.armies.length).toBe(0);
            Battle.requestNodeForcesToGoToNode(battleInfo.nodes['2']);
            expect(battleInfo.armies.length).toBe(1);
            expect(battleInfo.nodes['1'].currentOwner).toBe(battleInfo.players[0]);
            expect(battleInfo.nodes['1'].ownerStrength).toBe(10);
        }));

        it('should create an army with correct params and reduce node forces, with a fixed force', inject(function() {
            Battle.requestSelection(battleInfo.nodes['1']);
            expect(battleInfo.armies.length).toBe(0);
            Battle.requestNodeForcesToGoToNode(battleInfo.nodes['2'], 1);
            expect(battleInfo.armies.length).toBe(1);
            expect(battleInfo.nodes['1'].currentOwner).toBe(battleInfo.players[0]);
            expect(battleInfo.nodes['1'].ownerStrength).toBe(19);
        }));

        it('should create an army with correct params and reduce node forces, with a total force', inject(function() {
            Battle.requestSelection(battleInfo.nodes['1']);
            expect(battleInfo.armies.length).toBe(0);
            Battle.requestNodeForcesToGoToNode(battleInfo.nodes['2'], 20);
            expect(battleInfo.armies.length).toBe(1);
            expect(battleInfo.nodes['1'].currentOwner).toBe(battleInfo.players[0]);
            expect(battleInfo.nodes['1'].ownerStrength).toBe(0);
        }));

        it('should create an army with correct params and reduce node forces, with a more than total force', inject(function() {
            Battle.requestSelection(battleInfo.nodes['1']);
            expect(battleInfo.armies.length).toBe(0);
            Battle.requestNodeForcesToGoToNode(battleInfo.nodes['2'], 300);
            expect(battleInfo.armies.length).toBe(1);
            expect(battleInfo.nodes['1'].currentOwner).toBe(battleInfo.players[0]);
            expect(battleInfo.nodes['1'].ownerStrength).toBe(0);
        }));

        it('should do nothing when there are not available forces', inject(function() {
            Battle.requestSelection(battleInfo.nodes['1']);
            expect(battleInfo.armies.length).toBe(0);
            battleInfo.nodes['1'].ownerStrength = 0;
            Battle.requestNodeForcesToGoToNode(battleInfo.nodes['2']);
            expect(battleInfo.armies.length).toBe(0);
            expect(battleInfo.nodes['1'].currentOwner).toBe(battleInfo.players[0]);
            expect(battleInfo.nodes['1'].ownerStrength).toBe(0);
        }));


        it('a node without owner should be allowed to send forces', inject(function() {
            //TODO
        }));
    });

});
