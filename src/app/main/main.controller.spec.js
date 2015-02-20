'use strict';

describe('controllers', function(){
  var scope;

  beforeEach(module('caveBattles'));

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new();
  }));
});
