(function() {
    'use strict';

    angular
        .module('editor')
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
            editors:[],
            tags:[]
        };

        vm.qtype_options = [
            ['True or False', 0],
            ['Multiple Choice', 1],
            ['Fill-in-the-Blank', 2]
        ];
        //vm.stem = {
        //    statement: "Tell if the fraction on the left is less or greater than the fraction on the right."
        //};
        //
        //vm.keys = {
        //    answer: 0,
        //    choices: [
        //        "2/3",
        //        "3/5"
        //    ]
        //};
        //
        //vm.validation = '';
        //vm.explanation = '';
        //vm.editors = ["joeny"];
    }
})();