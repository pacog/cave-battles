'use strict';

describe('ordered list', function(){

    var OrderedList;

    beforeEach(module('caveBattles.utils.ordered-list'));

    beforeEach(inject(function(_OrderedList_) {
        OrderedList = _OrderedList_;
    }));

    it('should have a service', inject(function() {
        expect(OrderedList).toBeTruthy();
    }));

    it('should have 0 size at the beginning', inject(function() {
        var list = new OrderedList();
        expect(list.size()).toBe(0);
    }));

    it('should have 1 size when adding an element', inject(function() {
        var list = new OrderedList();
        list.add({
            time: 123,
            text: 'foo'
        });
        expect(list.size()).toBe(1);
    }));

    it('should return the element we added', inject(function() {
        var list = new OrderedList();
        var myElement = {
            time: 123,
            text: 'foo'
        };
        list.add(myElement);
        var otherElement = list.pop();
        expect(otherElement).toBe(myElement);
        expect(list.size()).toBe(0);
    }));

    it('should add objects ordered', inject(function() {
        var list = new OrderedList();
        var first = {
            time: 1,
            text: 'foo'
        };
        
        var second = {
            time: 2,
            text: 'foo'
        };
        
        var third = {
            time: 3,
            text: 'foo'
        };

        list.add(first);
        list.add(second);
        list.add(third);
        expect(list.size()).toBe(3);
        expect(list.pop()).toBe(first);
        expect(list.pop()).toBe(second);
        expect(list.pop()).toBe(third);
        expect(list.size()).toBe(0);

        //Now trying with different orders
        list.add(third);
        list.add(second);
        list.add(first);
        expect(list.size()).toBe(3);
        expect(list.pop()).toBe(first);
        expect(list.pop()).toBe(second);
        expect(list.pop()).toBe(third);
        expect(list.size()).toBe(0);

        list.add(second);
        list.add(third);
        list.add(first);
        expect(list.size()).toBe(3);
        expect(list.pop()).toBe(first);
        expect(list.pop()).toBe(second);
        expect(list.pop()).toBe(third);
        expect(list.size()).toBe(0);

        list.add(first);
        list.add(third);
        list.add(second);
        expect(list.size()).toBe(3);
        expect(list.pop()).toBe(first);
        expect(list.pop()).toBe(second);
        expect(list.pop()).toBe(third);
        expect(list.size()).toBe(0);
    }));

    it('should add objects ordered using another orderBy property', inject(function() {
        var list = new OrderedList({ orderBy: 'otherTime'});
        var first = {
            otherTime: 1,
            text: 'foo'
        };
        
        var second = {
            otherTime: 2,
            text: 'foo'
        };
        
        var third = {
            otherTime: 3,
            text: 'foo'
        };

        list.add(first);
        list.add(second);
        list.add(third);
        expect(list.size()).toBe(3);
        expect(list.pop()).toBe(first);
        expect(list.pop()).toBe(second);
        expect(list.pop()).toBe(third);
        expect(list.size()).toBe(0);

        //Now trying with different orders
        list.add(third);
        list.add(second);
        list.add(first);
        expect(list.size()).toBe(3);
        expect(list.pop()).toBe(first);
        expect(list.pop()).toBe(second);
        expect(list.pop()).toBe(third);
        expect(list.size()).toBe(0);

        list.add(second);
        list.add(third);
        list.add(first);
        expect(list.size()).toBe(3);
        expect(list.pop()).toBe(first);
        expect(list.pop()).toBe(second);
        expect(list.pop()).toBe(third);
        expect(list.size()).toBe(0);

        list.add(first);
        list.add(third);
        list.add(second);
        expect(list.size()).toBe(3);
        expect(list.pop()).toBe(first);
        expect(list.pop()).toBe(second);
        expect(list.pop()).toBe(third);
        expect(list.size()).toBe(0);
    }));

    it('should be able to remove elements', inject(function() {
        var list = new OrderedList();
        var first = {
            time: 1,
            text: 'foo'
        };
        
        var second = {
            time: 2,
            text: 'foo'
        };
        
        var third = {
            time: 3,
            text: 'foo'
        };

        list.add(first);
        list.add(second);
        list.add(third);
        expect(list.size()).toBe(3);
        expect(list.remove(second)).toBe(second);
        expect(list.size()).toBe(2);
        expect(list.remove(first)).toBe(first);
        expect(list.size()).toBe(1);
        expect(list.remove(third)).toBe(third);
        expect(list.size()).toBe(0);


        list.add(second);
        list.add(third);
        list.add(first);
        expect(list.size()).toBe(3);
        expect(list.remove(third)).toBe(third);
        expect(list.size()).toBe(2);
        expect(list.remove(second)).toBe(second);
        expect(list.size()).toBe(1);
        expect(list.remove(first)).toBe(first);
        expect(list.size()).toBe(0);
    }));

    it('cannot remove unexisting elements', inject(function() {
        var list = new OrderedList();
        var first = {
            time: 1,
            text: 'foo'
        };
        
        var second = {
            time: 2,
            text: 'foo'
        };
        
        var third = {
            time: 3,
            text: 'foo'
        };
        list.add(second);
        list.add(third);
        list.add(first);
        expect(list.size()).toBe(3);
        expect(list.remove()).toBe(false);
        expect(list.size()).toBe(3);
        expect(list.remove({fake: 'yes'})).toBe(false);
        expect(list.size()).toBe(3);
    }));

    it('forEach function should work', inject(function() {
        var list = new OrderedList();
        var first = {
            time: 1,
            text: 'foo'
        };
        
        var second = {
            time: 2,
            text: 'foo'
        };
        
        var third = {
            time: 3,
            text: 'foo'
        };
        list.add(second);
        list.add(third);
        list.add(first);

        var destination = [];
        list.forEach(function(event) {
            destination.push(event);
        });
        expect(destination[0]).toBe(first);
        expect(destination[1]).toBe(second);
        expect(destination[2]).toBe(third);
    }));
});
