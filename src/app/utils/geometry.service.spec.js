'use strict';

describe('geometry', function(){

    var Geometry;

    beforeEach(module('caveBattles.utils.geometry'));

    beforeEach(inject(function(_Geometry_) {
        Geometry = _Geometry_;
    }));

    it('should have a service', inject(function() {
        expect(Geometry).toBeTruthy();
    }));

    describe('getPointInBetween', function(){
        it('should work', inject(function() {
            var point1 = {
                x: -1,
                y: -1
            };
            var point2 = {
                x: 1,
                y: 1
            };

            expect(Geometry.getPointInBetween(point1, point2, 0)).toEqual({ x: -1, y: -1});
            expect(Geometry.getPointInBetween(point1, point2, 1)).toEqual({ x: 1, y: 1});
            expect(Geometry.getPointInBetween(point1, point2, 0.25)).toEqual({ x: -0.5, y: -0.5});
            expect(Geometry.getPointInBetween(point1, point2, 0.5)).toEqual({ x: 0, y: 0});
            expect(Geometry.getPointInBetween(point1, point2, 0.75)).toEqual({ x: 0.5, y: 0.5});

            expect(Geometry.getPointInBetween(point2, point1, 0)).toEqual({ x: 1, y: 1});
            expect(Geometry.getPointInBetween(point2, point1, 1)).toEqual({ x: -1, y: -1});
            expect(Geometry.getPointInBetween(point2, point1, 0.25)).toEqual({ x: 0.5, y: 0.5});
            expect(Geometry.getPointInBetween(point2, point1, 0.5)).toEqual({ x: 0, y: 0});
            expect(Geometry.getPointInBetween(point2, point1, 0.75)).toEqual({ x: -0.5, y: -0.5});
        }));
    });
    
});
