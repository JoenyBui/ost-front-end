(function() {
    'use strict';

    angular
        .module('app.editor')
        .controller('EditorMathPageController', EditorMathPageController);

    /* @ngInject */
    function EditorMathPageController($scope, $log, $mdDialog, $stateParams, djangoAuth) {
        
        var vm = this;

        vm.problemId = null;
        vm.autocompleteRequireMatch = true;

        // Initialize problem problem.
        vm.problem = {
            name: 'Test Problem',
            domain: 1000,
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
            }
        };

        // ====================================================
        // Status
        // ====================================================
        vm.statusType = {
            options: [
                ['Created', 0],
                ['Draft', 1],
                ['Submitted', 2],
                ['Reviewed', 3],
                ['Published', 4],
                ['Revised', 5],
                ['Lock', 6]
            ],
            selectedItem: 0
        };

        // ====================================================
        // Question Type
        // ====================================================

        vm.questionType = {
            options : [
                ['True or False', 0],
                ['Multiple Choice', 1],
                ['Fill-in-the-Blank', 2]
            ],
            selectedItem: 0,
            tf: {
                answer: false
            },
            mc: {
                answer: null,
                choices: [null, null, null]
            },
            fib: {
                answer: null
            }
        };
        vm.qtype_options = [
            ['True or False', 0],
            ['Multiple Choice', 1],
            ['Fill-in-the-Blank', 2]
        ];

        vm.add_mc_item = function () {
            vm.questionType.mc.choices.push(null)
        };

        vm.remove_mc_item = function () {

        };

        // ====================================================
        // Topic
        // ====================================================
        vm.topicSelectedItem = null;
        vm.topicSearchText = null;
        vm.topicItems = [];
        vm.topicLists = [];

        var promiseTopic = djangoAuth.request({
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

        var promiseEditor = djangoAuth.request({
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


        // Ping existing database if there is something interesting.
        if ($stateParams.hasOwnProperty('problemId')) {
            var problemId = $stateParams.problemId;

            if (!(problemId === "")) {
                vm.problemId = problemId;

                djangoAuth.request({
                    method: 'GET',
                    url: 'v1/math/maths/' + vm.problemId + '/',
                    data: {}
                }).then(function (data) {
                    if ('id' in data) {
                        vm.problem.id = data['id'];
                    }

                    if ('name' in data) {
                        vm.problem.name = data['name'];
                    }

                    if ('domain' in data) {
                        vm.problem.domain = data['domain']
                    }

                    if ('stem' in data) {
                        vm.problem.stem = data['stem'];
                    }

                    if ('keys' in data) {
                        vm.problem.keys = data['keys'];
                    }

                    if ('status' in data) {
                        vm.statusType.selectedItem = data['status'];
                    }

                    if ('qtype' in data) {
                        vm.questionType.selectedItem = data['qtype'];
                    }

                    if ('topics' in data) {
                        promiseTopic.then(function() {
                            var topicPk = data['topics'];

                            // TODO: Need to do this in the backend.
                            for (var index in vm.topicLists) {
                                var item = vm.topicLists[index];

                                for (var index_pk in topicPk) {
                                    var pk = topicPk[index_pk];

                                    if (item.id == pk) {
                                        vm.topicItems.push(item);

                                        // Remove the editor from the pk
                                        topicPk.splice(topicPk.indexOf(pk), 1);

                                        break;
                                    }

                                }
                            }
                        })
                    }

                    if ('editors' in data) {
                        promiseEditor.then(function() {
                            var editorPk = data['editors'];

                            // TODO: Need to do this in the backend.
                            for (var index in vm.editorLists) {
                                var item = vm.editorLists[index];

                                for (var index_pk in editorPk) {
                                    var pk = editorPk[index_pk];

                                    if (item.id == pk) {
                                        vm.editorItems.push(item);

                                        // Remove the editor from the pk
                                        editorPk.splice(editorPk.indexOf(pk), 1);

                                        break;
                                    }

                                }
                            }
                        })
                    }

                    // vm.problem = data;
                }, function (reason) {
                    $log.log(reason);
                });
            }
        }
        
        /*
        * Broadcast Function
        * */
        $scope.$on('submitJob', function(ev) {
            var job = vm.problem;

            $mdDialog.show({
                templateUrl: 'app/editor/form/editor-submit.tmpl.html',
                targetEvent: ev,
                controller: 'EditorSubmitJobController',
                controllerAs: 'vm',
                locals: {
                    job: job,
                    requestUrl: 'v1/math/maths/'
                }
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

        // Add Variable
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

        // Add Pie Chart
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