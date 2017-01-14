/**
 * Created by joeny on 1/13/17.
 */

(function () {
  'use strict';

  angular
    .module('app.components')
    .directive('ostTopicsChip', ostTopicsChip);

  function ostTopicsChip() {
    return {
      restrict: 'E',
      templateUrl: 'app/components/topics/topics-chip-directive.tmpl.html',
      scope: {
        title: '@',
        topics: '='
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

      vm.topicSelectedItem = null;
      vm.topicSearchText = null;
      vm.topicItems = [];
      vm.topicLists = [];
      vm.topicMapper = {};

      // TODO: Load the topic promise at resolves.
      var promiseTopic = djangoAuth.request({
        method: 'GET',
        url: 'v1/topic/topics/',
        data: {}
      }).then(function (data) {
        vm.topicLists = data.map(function (top) {
          top._lowername = top.name.toLowerCase();
          return top;
        });

        for (var index in vm.topicLists) {
          var item = vm.topicLists[index];

          vm.topicMapper[item.id] = index;
        }

        // Add the topic.
        for (var id in vm.topics) {
          vm.addItem(vm.topics[id]);
        }
      }, function (reason) {
        $log.log(reason);
      });

      vm.querySearchTopic = function (query) {
        var results = query ? this.topicLists.filter(this.createFilterForTopic(query)) : [];
        return results;
      };

      /**
       * Create filter function for a query string
       */
      vm.createFilterForTopic = function (query) {
        var lowercaseQuery = angular.lowercase(query);
        return function filterFn(topic) {
          return (topic._lowername.indexOf(lowercaseQuery) === 0) ||
            (String(topic.key).indexOf(lowercaseQuery) === 0);
        };
      };

      /**
      * Add the item as a chip.
       *
      * */
      vm.addItem = function(key) {
        var item = vm.topicLists[vm.topicMapper[key]];

        // Add Item to index.
        vm.topicItems.push(item);
      };

    //  TODO: Needs to capture the submit entry so it could save it back to the model.
    }
  }
})();