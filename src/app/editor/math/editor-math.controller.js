(function() {
    'use strict';

    angular
        .module('app.editor')
        .controller('EditorMathPageController', EditorMathPageController);

    /* @ngInject */
    function EditorMathPageController($scope, $log, $mdDialog, $stateParams, $mdExpansionPanel, djangoAuth) {
        
        var vm = this;

        $mdExpansionPanel().waitFor('base').then(function (instance) {
            instance.expand();
        });

        var UNASSIGNED = 0;
        var FILL_IN_THE_BLANK = 1;
        var TRUE_OF_FALSE = 2;
        var MULTIPLE_CHOICE = 3;
        var PROBLEM_SET = 4;
        var SHORT_ANSWER = 5;
        var MULTIPLE_ANSWER = 6;
        var WORD_PROBLEM = 7;

        $mdExpansionPanel().waitFor('panelOne').then(function (instance) {
            instance.expand();
        })

        vm.problemId = null;
        vm.autocompleteRequireMatch = true;

        // Initialize problem problem.
        vm.problem = {
            id: -1,
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
                ['Fill-in-the-Blank', FILL_IN_THE_BLANK],
                ['True or False', TRUE_OF_FALSE],
                ['Multiple Choice', MULTIPLE_CHOICE]
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
            ['Fill-in-the-Blank', FILL_IN_THE_BLANK],
            ['True or False', TRUE_OF_FALSE],
            ['Multiple Choice', MULTIPLE_CHOICE]
        ];

        vm.add_mc_item = function () {
            vm.questionType.mc.choices.push(null)
        };

        vm.remove_mc_item = function (item) {
            for(var i = vm.questionType.mc.choices.length - 1; i >= 0; i--) {
                if(vm.questionType.mc.choices[i] === item) {
                    vm.questionType.mc.choices.splice(i, 1);
                }
            }
        };

        vm.editVariable = function (variable) {
            $mdDialog.show({
                templateUrl: 'app/editor/form/editor-variable.tmpl.html',
                // targetEvent: ev,
                controller: 'EditorVariableDialogController',
                controllerAs: 'vm',
                locals: {
                    variable: variable
                }
            })
            .then(function (answer) {
                // Broadcast the update with some toast.
                // vm.problem.keys.variables.push(answer);
            });
        };

        vm.removeVariable = function (variable) {
            for(var i = vm.problem.keys.variables.length - 1; i >= 0; i--) {
                if(vm.problem.keys.variables[i] === variable) {
                    vm.problem.keys.variables.splice(i, 1);
                }
            }
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

                    if ('status' in data) {
                        vm.statusType.selectedItem = data['status'];
                    }

                    if ('stem' in data) {
                        if(data['stem'].constructor == Object) {
                            if ('statement' in data['stem']) {
                                vm.problem.stem.statement = data['stem']['statement'];
                            }

                            if ('figures' in data['stem']){
                                vm.problem.stem.figures = data['stem']['figures'];
                            }

                            if ('charts' in data['stem']) {
                                vm.problem.stem.charts = data['stem']['charts'];
                            }
                        }
                    }

                    if ('keys' in data) {
                        if (data['keys'].constructor == Object) {
                            if ('answer' in data['keys']) {
                                vm.problem.keys.answer = data['keys']['answer'];
                            }

                            if ('choices' in data['keys']) {
                                vm.problem.keys.choices = data['keys']['choices'];
                            }

                            if ('variables' in data['keys']) {
                                vm.problem.keys.variables = data['keys']['variables'];
                            }
                        }
                    }

                    if ('qtype' in data) {
                        vm.questionType.selectedItem = data['qtype'];

                        var qtype = data['qtype'];

                        if (qtype == TRUE_OF_FALSE) {
                            /*True or False*/
                            vm.questionType.tf.answer = vm.problem.keys.answer;
                            vm.questionType.tf.choices = null;
                        }
                        else if (qtype == MULTIPLE_CHOICE) {
                            /*Multiple Choice*/
                            vm.questionType.mc.answer = vm.problem.keys.answer;
                            vm.questionType.mc.choices = vm.problem.keys.choices;
                        }
                        else if (qtype == FILL_IN_THE_BLANK) {
                            /*Fill in the Blank*/
                            vm.questionType.fib.answer = vm.problem.keys.answer;
                            vm.questionType.fib.choices = null;

                        }
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
            var job = angular.copy(vm.problem);

            job.status = vm.statusType.selectedItem;

            job.editors = [];
            for (var index in vm.editorItems) {
                var item = vm.editorItems[index];
                job.editors.push(item.id);
            }

            job.topics = [];
            for (var index in vm.topicItems) {
                var item = vm.topicItems[index];
                job.topics.push(item.id);
            }

            job.qtype = vm.questionType.selectedItem;

            // job.keys = {};
            if (job.qtype == TRUE_OF_FALSE) {
                /*True or False*/
                job.keys.answer = vm.questionType.tf.answer;
                job.keys.choices = null;
            }
            else if (job.qtype == MULTIPLE_CHOICE) {
                /*Multiple Choice*/
                job.keys.answer = vm.questionType.mc.answer;
                job.keys.choices = vm.questionType.mc.choices;
            }
            else if (job.qtype == FILL_IN_THE_BLANK) {
                /*Fill in the Blank*/
                job.keys.answer = vm.questionType.fib.answer;
                job.keys.choices = null;
            }

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
            .then(function(args) {
                var job = args[0];
                var requestUrl = args[1];
                var method = args[2];

                djangoAuth.request({
                    method: method,
                    url: requestUrl,
                    data: job
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
                    controllerAs: 'vm',
                    locals: {
                        variable: null
                    }
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