/**
 * Created by joeny on 6/15/16.
 */
(function () {
    'use strict';

    angular
        .module('app.classroom')
        .controller('SenseiTestController', SenseiTestController);

    /* @ngInject */
    function SenseiTestController($scope, $log, $mdDialog, $mdSidenav, $stateParams, djangoAuth) {
        var vm = this;

        vm.test = {
            id: -1,
            name: "",
            teacher: "",
            problems: []
        };

        vm.problemInfo = [];

        if ($stateParams.hasOwnProperty('testId')) {
            var testId = $stateParams.testId;

            if (!(testId === "")) {
                djangoAuth.request({
                    method: 'GET',
                    url: 'v1/classroom/exam-problems/' + testId + '/',
                    data: {}
                }).then(function (data) {
                    if ('id' in data) {
                        vm.test.id = data['id'];
                    }

                    if ('name' in data) {
                        vm.test.name = data['name'];
                    }

                    if ('teacher' in data) {
                        vm.test.teacher = data['teacher'];
                    }

                    if ('problems' in data) {
                        vm.test.problems = data['problems'];
                    }

                    if ('info' in data) {
                        if ('problems' in data['info']) {
                            vm.problemInfo = data['info']['problems'];
                        }
                    }

                }, function (reason) {

                });
            }
        }

        // list of `state` value/display objects
        vm.results = [];
        vm.selectedItem = null;
        vm.searchText = null;
        vm.limit = 10;
        vm.offset = 1;
        vm.simulateQuery = false;
        vm.isDisabled = false;

        vm.querySearch = function (query) {
            var results = query ? vm.results.filter(createFilterFor(query)) : vm.results, deferred;
            if (self.simulateQuery) {
                deferred = $q.defer();
                $timeout(function () {
                    deferred.resolve(results);
                }, Math.random() * 1000, false);
                return deferred.promise;
            } else {
                return results;
            }
        };

        vm.searchTextChange = function (text) {
            var results = djangoAuth.request({
                method: 'GET',
                url: 'v1/problem/problem-instance/?limit=' + vm.limit + '&offset= ' + vm.index*vm.limit + '&search=' + vm.searchText,
                data: {}
            }).then(function (data) {
                vm.results = data.results;

                $mdSidenav('right').toggle();
            }, function (reason) {
                console.log(reason);
            });
        };

        vm.selectedItemChange = function (item) {
            $log.info('Item changed to ' + item);
        };

        /**
         * Build `states` list of key/value pairs
         */
        function loadAll() {
            /* jshint multistr: true */
            var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
                Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
                Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
                Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
                North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
                South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
                Wisconsin, Wyoming';

            return allStates.split(/, +/g).map(function (state) {
                return {
                    value: state.toLowerCase(),
                    display: state
                };
            });
        }

        /**
         * Create filter function for a query string
         */
        vm.createFilterFor = function (query) {
            var lowercaseQuery = angular.lowercase(query);

            return function filterFn(state) {
                return (state.value.indexOf(lowercaseQuery) === 0);
            };
        };

        vm.add_check_item = function () {
            var dataChanged = false;

            for (var index in vm.results) {
                var item = vm.results[index];

                if ('selected' in item) {
                    vm.test.problems.push(item.id);

                    if (!(item.id in vm.problemInfo)) {
                        vm.problemInfo[item.id] = item.data;

                        dataChanged = true;
                    }

                }
            }

            if (dataChanged) {
                djangoAuth.request({
                    method: 'PUT',
                    url: 'v1/classroom/exam-problems/' + vm.test.id + '/',
                    data: vm.test
                }).then(function (data) {

                }, function (reason) {

                });
            }


            $mdSidenav('right').toggle();
        };

    }
})();