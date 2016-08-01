(function() {
    'use strict';

    angular
        .module('app.editor')
        .controller('EditorPageController', EditorPageController);

    /* @ngInject */
    function EditorPageController() {
        var vm = this;

        vm.fraction = {
            name: 'Test Problem',
            domain: 1004,
            qtype: 0,
            stem: {
                statement: "Tell if the fraction on the left is less or greater than the fraction on the right."
            },
            keys: {
                answer: 0,
                choices: [
                    "2/3",
                    "3/5"
                ]
            },
            validation:{

            },
            explanation:{

            },
            editors:['jbui', 'cdavis'],
            tags:['math']
        };

        vm.variables = [
            {name: 'numerator', value: 1, type: 'int'},
            {name: 'denominator', value: 2, type: 'int'}
        ];

        vm.qtype_options = [
            ['True or False', 0],
            ['Multiple Choice', 1],
            ['Fill-in-the-Blank', 2]
        ];

        vm.add_choice = function () {
            this.fraction.keys.choices.push("1/2");
        };

        vm.add_line_chart = function () {
            console.log('Add Line Chart');
        };

        vm.add_pie_chart = function () {
            console.log('Add Pie Chart');
        };

    }
})();