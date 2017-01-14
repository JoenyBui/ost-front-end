/**
 * Created by joeny on 1/13/17.
 */

(function () {
  'use strict';

  angular
    .module('app.components')
    .directive('ostEditorsChip', ostEditorsChip);

  function ostEditorsChip() {
    return {
      restrict: 'E',
      templateUrl: 'app/components/editors/editors-chip-directive.tmpl.html',
      scope: {
        title: '@',
        editors: '='
      },
      bindToController: true,
      link: link,
      controller: Controller,
      controllerAs: 'vm'
    };

    function link($scope, $element, attrs) {
      $scope.vm.title = attrs.title
    }

    function Controller(djangoAuth) {
      var vm = this;

      vm.editorSelectedItem = null;
      vm.editorSearchText = null;
      vm.editorItems = [];
      vm.editorLists = [];
      vm.editorMapper = {};

      var promiseEditor = djangoAuth.request({
        method: 'GET',
        url: 'v1/editor/editors/',
        data: {}
      }).then(function (data) {

        vm.editorLists = data.map(function (edi) {
          edi._lowername = edi.pen_name.toLowerCase();

          return edi;
        });

        for (var index in vm.editorLists) {
          var item = vm.editorLists[index];

          vm.editorMapper[item.user] = index;
        }

        // Add the editor.
        for (var id in vm.editors) {
          vm.addItem(vm.editors[id]);
        }
      }, function (reason) {
        $log.log(reason);
      });

      vm.transformChip = function (chip) {
        // If it is an object, it's already a known chip
        if (angular.isObject(chip)) {
          return chip;
        }

        // Otherwise, create a new one
        return {name: chip, type: 'new'}
      };

      vm.querySearchEditor = function (query) {
        var results = query ? this.editorLists.filter(this.createFilterForEditor(query)) : [];
        return results;
      };

      /**
       * Create filter function for a query string
       */
      vm.createFilterForEditor = function (query) {
        var lowercaseQuery = angular.lowercase(query);
        return function filterFn(editors) {
          return editors._lowername.indexOf(lowercaseQuery) === 0;
        };
      };
      
      vm.addItem = function (key) {
        var item = vm.editorLists[vm.editorMapper[key]];

        vm.editorItems.push(item);
      }
    }
  }
})();