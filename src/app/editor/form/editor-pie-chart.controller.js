(function() {
    'use strict';

    angular
        .module('app.editor')
        .controller('EditorChartJsPieController', EditorChartJsPieController);

    /* @ngInject */
    function EditorChartJsPieController($interval) {
        var vm = this;
        vm.labels = ['Download Sales', 'Instore Sales', 'Mail Order'];
        vm.options = {
            datasetFill: false
        };

        /////////////

        function randomData() {
            vm.data = [];
            for(var label = 0; label < vm.labels.length; label++) {
                vm.data.push(Math.floor((Math.random() * 100) + 1));
            }
        }

        // init

        randomData();

        // Simulate async data update
        $interval(randomData, 5000);
    }
})();