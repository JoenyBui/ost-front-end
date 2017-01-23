(function () {
  'use strict';

  angular
    .module('app.classroom')
    .controller('SenseiTestFabController', SenseiTestFabController);

  function SenseiTestFabController($rootScope) {

    var vm = this;

    vm.search = function ($event) {
      $rootScope.$broadcast('search', $event);
    };

  }
})();