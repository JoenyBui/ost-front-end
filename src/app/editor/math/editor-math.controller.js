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
        vm.autocompleteRequireMatch = true;

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

        // Add in general variables
        vm.qtype_options = [
            ['True or False', 0],
            ['Multiple Choice', 1],
            ['Fill-in-the-Blank', 2]
        ];

        // ====================================================
        // Topic
        // ====================================================
        vm.topicSelectedItem = null;
        vm.topicSearchText = null;
        vm.topicItems = [];
        vm.topicLists = [];


        djangoAuth.request({
            method: 'GET',
            url: 'v1/topic/topics/',
            data: {}
        }).then(function (data) {
            vm.topicLists = data.map(function(top) {
                top._lowername = top.name.toLowerCase();
                return top;
            });
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
        // ======================================================
        // Editor
        // ======================================================
        vm.editorSelectedItem = null;
        vm.editorSearchText = null;
        vm.editorItems = [];
        vm.editorLists = [];

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

        vm.transformChip = function(chip) {
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