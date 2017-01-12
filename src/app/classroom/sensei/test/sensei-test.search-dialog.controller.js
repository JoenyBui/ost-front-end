/**
 * Created by joeny on 12/4/16.
 */
(function () {
	'use strict';

		angular
			.module('app.classroom')
			.controller('SenseiTestSearchDialogController', SenseiTestSearchDialogController);

		/* ngInject */
		function SenseiTestSearchDialogController($scope, $mdDialog, $stateParams, $log, djangoAuth) {
			var vm = this;

			vm.topics = [];

			vm.simulateQuery = false;
			vm.isDisabled = false;

			vm.states = loadAll();
			vm.querySearch = querySearch;
			vm.selectedItemChange = selectedItemChange;
			vm.searchTextChange = searchTextChange;
			vm.searchText = "";

			vm.newState = newState;

			function newState(state) {
				alert("Sorry! You'll need to create a Constitution for " + state + " first!");
			}

			// ******************************
			// Internal methods
			// ******************************

			/**
			 * Search for query... use $timeout to simulate remote dataservice call.
			 */
			function querySearch (query) {
				var results = query ? vm.states.filter( createFilterFor(query) ) : vm.states, deferred;
				if (vm.simulateQuery) {
					deferred = $q.defer();

					$timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);

					return deferred.promise;
				} else {
					return results;
				}
			}

			function searchTextChange(text) {
				$log.info('Text changed to ' + text);
			}

			function selectedItemChange(item) {
				$log.info('Item changed to ' + JSON.stringify(item));
			}

			/**
			 * Build `states` list of key/value pairs
			 */
			function loadAll() {
				var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
					Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
					Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
					Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
					North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
					South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
					Wisconsin, Wyoming';

				return allStates.split(/, +/g).map( function (state) {
					return {
						value: state.toLowerCase(),
						display: state
					};
				});
			}

			/**
			 * Create filter function for a query string
			 */
			function createFilterFor(query) {
					var lowercaseQuery = angular.lowercase(query);

					return function filterFn(state) {
							return (state.value.indexOf(lowercaseQuery) === 0);
					};
			}

			djangoAuth.request({
					method: 'GET',
					url: 'v1/topic/topics/',
					data: {}
			}).then(function (data) {
					for (var key in data) {
							vm.topics.push({
									key: data[key].key,
									name: data[key].name
							})
					}
			}, function (reason) {

			});

			vm.searchForProblems = function () {
				var problems = djangoAuth.request({
					method: 'GET',
					url: 'v1/problem/problem-base/',
					data: {}
				}).then(function (data) {
					vm.results = data;
				}, function (reaosn) {

				})
			};

			vm.addCheckItem = function () {
				var addList = [];

				for (var i = 0; i < vm.results.length; i++) {
					if (vm.results[i].selected == true) {
						addList.push(vm.results[i].id);
					}
				}

				// Hide list item.
				$mdDialog.hide(addList);
			};
			
			vm.close = function () {
				$mdDialog.hide()
			};
		}
})();