(function() {
    'use strict';

    angular
        .module('app.editor')
        .controller('EditorFractionPageController', EditorFractionPageController);

    /* @ngInject */
    function EditorFractionPageController($scope, $log, $mdDialog, $stateParams, djangoAuth) {
        var vm = this;

        vm.fraction = null;
        vm.problemId = null;

        if ($stateParams.hasOwnProperty('problemId')) {
            vm.problemId = $stateParams.problemId;

            djangoAuth.request({
                method: 'GET',
                url: 'v1/math/fractions/' + vm.problemId,
                data: {}
            }).then(function (data) {
                vm.fraction = data;
            }, function (reason) {
                $log.log(reason);
            });
        } else {
            // Initialize fraction problem.
            vm.fraction = {
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
                editors:[1],
                tags:['math']
            };
        }


        // editors:['jbui', 'cdavis'],

        vm.qtype_options = [
            ['True or False', 0],
            ['Multiple Choice', 1],
            ['Fill-in-the-Blank', 2]
        ];

        vm.submit_job = function () {
            djangoAuth.request({
                method: 'POST',
                url: 'v1/math/fractions/',
                data: vm.fraction
            }).then(function(data) {
                $log.log(data);
            }, function(reason) {
                $log.log(reason);
            });
        };

        // watches

        $scope.$on('addVariable', function( ev ){
            $mdDialog.show({
                    templateUrl: 'app/editor/form/editor-variable.tmpl.html',
                    targetEvent: ev,
                    controller: 'EditorVariableDialogController',
                    controllerAs: 'vm'
                })
                .then(function(answer) {
                    vm.fraction.keys.variables.push(answer);
                });
        });

        $scope.$on('addPieChart', function (ev) {
            $mdDialog.show({
                templateUrl: 'app/editor/form/editor-pie-chart.tmpl.html',
                targetEvent: ev,
                controller: 'EditorChartJsPieController',
                controllerAs: 'vm',
                locals: {
                    variables: vm.fraction.keys.variables
                }
            }).then(function (chart) {
                vm.fraction.stem.charts.push(chart);
            });
        });
    }
})();