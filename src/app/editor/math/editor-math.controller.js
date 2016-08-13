(function() {
    'use strict';

    angular
        .module('app.editor')
        .controller('EditorMathPageController', EditorMathPageController);

    /* @ngInject */
    function EditorMathPageController($scope, $log, $mdDialog, $stateParams, djangoAuth) {
        
        var vm = this;

        vm.problem = null;
        vm.problemId = null;
        vm.topicLists = null;
        vm.autocompleteRequireMatch = true;
        vm.selectedItem = null;
        vm.searchText = null;
        vm.editorItems = [];
        vm.editorLists = [];
        // vm.transformChip = transformChip;
        // vm.querySearch = querySearch;

        if ($stateParams.hasOwnProperty('problemId')) {
            vm.problemId = $stateParams.problemId;

            djangoAuth.request({
                method: 'GET',
                url: 'v1/math/maths/' + vm.problemId,
                data: {}
            }).then(function (data) {
                vm.problem = data;
            }, function (reason) {
                $log.log(reason);
            });
        } else {
            // Initialize problem problem.
            vm.problem = {
                name: 'Test Problem',
                domain: 1004,
                qtype: 0,
                stem: {
                    statement: "Tell if the fraction on the left is less or greater than the fraction on the right.",
                    figures: [],
                    charts: []
                },
                keys: {
                    answer: 0,
                    choices: [
                        "2/3",
                        "3/5"
                    ],
                    variables: [
                        {name: 'numerator', value: 1, type: 'whole'},
                        {name: 'denominator', value: 2, type: 'whole'}
                    ]
                },
                validation: {},
                explanation: {},
                editors:[],
                tags:['math']
            };
        }

        // Topic
        djangoAuth.request({
            method: 'GET',
            url: 'v1/topic/topics/',
            data: {}
        }).then(function (data) {
            vm.topicLists = data;
        }, function (reason) {
            $log.log(reason);
        });

        // Editor
        djangoAuth.request({
            method: 'GET',
            url: 'v1/editor/editors/',
            data: {}
        }).then(function (data) {
            vm.editorLists = data.map(function(edi) {
                edi._lowername = edi.pen_name.toLowerCase();

                return edi;
            });
        }, function(reason) {
            $log.log(reason);
        });

        // Add in general variables
        vm.qtype_options = [
            ['True or False', 0],
            ['Multiple Choice', 1],
            ['Fill-in-the-Blank', 2]
        ];

        vm.transformChip = function(chip) {
            // If it is an object, it's already a known chip
            if (angular.isObject(chip)) {
                return chip;
            }

            // Otherwise, create a new one
            return {name: chip, type: 'new'}
        };

        vm.querySearch = function (query) {
            var results = query ? this.editorLists.filter(this.createFilterFor(query)) : [];

            return results;
        };

        // vm.submit_job = function () {
        //     djangoAuth.request({
        //         method: 'POST',
        //         url: 'v1/math/maths/',
        //         data: vm.problem
        //     }).then(function(data) {
        //         $log.log(data);
        //     }, function(reason) {
        //         $log.log(reason);
        //     });
        // };

        /**
         * Create filter function for a query string
         */
        vm.createFilterFor = function (query) {
            var lowercaseQuery = angular.lowercase(query);
            return function filterFn(editors) {
                return editors._lowername.indexOf(lowercaseQuery) == 0;
                // return (editors._lowername.indexOf(lowercaseQuery) === 0) ||
                //     (editors._lowertype.indexOf(lowercaseQuery) === 0);
            };
        };

        // add function watches
        $scope.$on('submit_job ', function(ev) {
            $mdDialog.show({
                templateUrl: 'app/editor/form/editor-submit.tmpl.html',
                targetEvent: ev,
                controller: 'EditorSubmitJobController',
                controllerAs: 'vm'
            })
            .then(function(job) {
                djangoAuth.request({
                    method: 'POST',
                    url: 'v1/math/maths/',
                    data: vm.problem
                }).then(function(data) {
                    $log.log(data);
                }, function(reason) {
                    $log.log(reason);
                });

            })
        });

        $scope.$on('addVariable', function( ev ){
            $mdDialog.show({
                    templateUrl: 'app/editor/form/editor-variable.tmpl.html',
                    targetEvent: ev,
                    controller: 'EditorVariableDialogController',
                    controllerAs: 'vm'
                })
                .then(function(answer) {
                    vm.problem.keys.variables.push(answer);
                });
        });

        $scope.$on('addPieChart', function (ev) {
            $mdDialog.show({
                templateUrl: 'app/editor/form/editor-pie-chart.tmpl.html',
                targetEvent: ev,
                controller: 'EditorChartJsPieController',
                controllerAs: 'vm',
                locals: {
                    variables: vm.problem.keys.variables
                }
            }).then(function (chart) {
                vm.problem.stem.charts.push(chart);
            });
        });
    }
})();