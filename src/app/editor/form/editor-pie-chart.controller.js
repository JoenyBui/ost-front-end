(function() {
    'use strict';

    angular
        .module('app.editor')
        .controller('EditorChartJsPieController', EditorChartJsPieController);

    /* @ngInject */
    function EditorChartJsPieController($interval, $mdDialog, variables) {
        var vm = this;

        vm.chart = {
            data: [
                Math.floor((Math.random() * 100) + 1),
                Math.floor((Math.random() * 100) + 1)
            ],
            labels: ['Fill', 'Empty'],
            options: {
                datasetFill: false
            }
        };
        //
        //function randomData() {
        //    for(var label = 0; label < vm.chart.labels.length; label++) {
        //        vm.chart.data.push(Math.floor((Math.random() * 100) + 1));
        //    }
        //}
        //
        //// init
        //randomData();

        // Simulate async data update
        //$interval(randomData, 5000);

        vm.variable_option = [];
        for (var i = 0; i < variables.length; i++) {
            vm.variable_option.push({
                index: i,
                name: variables[i].name
            });
        }

        vm.selected_numerator = 0;
        vm.selected_denominator = 1;

        vm.update = function () {
            var fill = variables[vm.selected_numerator].value;
            var total = variables[vm.selected_denominator].value;

            fill = parseInt(fill);
            total = parseInt(total);

            vm.chart.data[0] = fill;
            vm.chart.data[1] = total - fill;
        };

        vm.selectChangedNumerator = function(){
            vm.update();
        };

        vm.selectChangedDenominator = function () {
            vm.update();
        };

        vm.hide = function() {
            var pieChart = {};

            pieChart.type = 1000;
            pieChart.numerator = variables[vm.selected_numerator].name;
            pieChart.denominator = variables[vm.selected_denominator].name;
            pieChart.chart = vm.chart;

            $mdDialog.hide(pieChart);
        };

        vm.cancel = function () {
            $mdDialog.cancel();
        };

        vm.update();
    }
})();