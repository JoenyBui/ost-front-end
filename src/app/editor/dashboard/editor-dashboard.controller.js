/**
 * Created by joeny on 5/1/16.
 */
(function () {
  'use strict';

  angular
    .module('app.editor')
    .controller('EditorDashboardController', EditorDashboardController);

  /* @ngInject */
  function EditorDashboardController($scope, $mdDialog, $log, $timeout, $state, $mdExpansionPanel, $mdExpansionPanelGroup, djangoAuth) {
    var vm = this;

    $mdExpansionPanel().waitFor('base').then(function (instance) {
      instance.expand();
    });

    vm.feed = [];

    var promiseProblem = djangoAuth.request({
      method: 'GET',
      url: 'v1/problem/problem-base/' + '?ordering=-modified',
      data: {}
    }).then(function (data) {
      $log.log(data);

      for (var key in data) {
        vm.feed.push(data[key]);
      }
    }, function (reason) {
      $log.log(reason);
    });

    vm.openEntry = function openEntry(entry, $event) {
      $mdDialog.show({
        controller: 'EditorDashboardDialogController',
        controllerAs: 'vm',
        templateUrl: 'app/editor/dashboard/editor-dashboard-dialog.tmpl.html',
        clickOutsideToClose: true,
        focusOnOpen: false,
        targetEvent: $event,
        locals: {
          problem: entry
        }
      });
    };

    var DynamicItems = function () {
      /**
       * @type {!Object<?Array>} Data pages, keyed by page number (0-index).
       */
      this.loadedPages = {};

      /** @type {number} Total number of items. */
      this.numItems = 0;

      /** @const {number} Number of items to fetch per request. */
      this.PAGE_SIZE = 50;
      this.fetchNumItems_();
    };

    // Required.
    DynamicItems.prototype.getItemAtIndex = function (index) {
      var pageNumber = Math.floor(index / this.PAGE_SIZE);
      var page = this.loadedPages[pageNumber];
      if (page) {
        return page[index % this.PAGE_SIZE];
      } else if (page !== null) {
        this.fetchPage_(pageNumber);
      }
    };

    // Required.
    DynamicItems.prototype.getLength = function () {
      return this.numItems;
    };

    DynamicItems.prototype.fetchPage_ = function (pageNumber) {
      // Set the page to null so we know it is already being fetched.
      this.loadedPages[pageNumber] = null;
      // For demo purposes, we simulate loading more items with a timed
      // promise. In real code, this function would likely contain an
      // $http request.
      $timeout(angular.noop, 300).then(angular.bind(this, function () {
        this.loadedPages[pageNumber] = [];
        var pageOffset = pageNumber * this.PAGE_SIZE;
        for (var i = pageOffset; i < pageOffset + this.PAGE_SIZE; i++) {
          this.loadedPages[pageNumber].push(i);
        }
      }));
    };
    DynamicItems.prototype.fetchNumItems_ = function () {
      // For demo purposes, we simulate loading the item count with a timed
      // promise. In real code, this function would likely contain an
      // $http request.
      $timeout(angular.noop, 300).then(angular.bind(this, function () {
        this.numItems = 50000;
      }));
    };

    this.dynamicItems = new DynamicItems();


    vm.selectedIndex = undefined;
    vm.selectIndex = function (index) {
      if (vm.selectedIndex !== index) {
        vm.selectedIndex = index;
      }
      else {
        vm.selectedIndex = undefined;
      }
    };

    /*
     * Open WhAM Item.
     * */
    vm.openItem = function (index) {
      var item = vm.feed[index];
      var problemId = item.id;

      $state.go(
        'triangular.admin-default.math', {
          'problemId': problemId
        }
      )
    };

    // Add Variable
    $scope.$on('addMath', function (ev) {
      $mdDialog.show({
        templateUrl: 'app/editor/dashboard/add-math.tmpl.html',
        targetEvent: ev,
        controller: 'AddMathDialogController',
        controllerAs: 'vm',
        locals: {
          variable: null
        }
      })
      .then(function (answer) {
        // vm.problem.keys.variables.push(answer);
      });
    });


    // Add Variable
    $scope.$on('addReading', function (ev) {
      $mdDialog.show({
        templateUrl: 'app/editor/dashboard/add-reading.tmpl.html',
        targetEvent: ev,
        controller: 'AddReadingDialogController',
        controllerAs: 'vm',
        locals: {
          variable: null
        }
      })
      .then(function (answer) {
        // vm.problem.keys.variables.push(answer);
      });
    });


    // Add Variable
    $scope.$on('addWriting', function (ev) {
      $mdDialog.show({
        templateUrl: 'app/editor/dashboard/add-writing.tmpl.html',
        targetEvent: ev,
        controller: 'AddWritingDialogController',
        controllerAs: 'vm',
        locals: {
          variable: null
        }
      })
      .then(function (answer) {
        vm.problem.keys.variables.push(answer);
      });
    });

  }
})();