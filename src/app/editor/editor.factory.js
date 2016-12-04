/**
 * Created by joeny on 12/4/16.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .factory('Editor', editorFactory);

    /**
     *
     *
     * */
    function editorFactory() {
        var Editor = Editor || {};

        Editor.Problem = function () {
            this.id = -1;
            this.name = "";
            this.editors = [];
            this.status = 0;
            this.domain = 1000;
            this.topics = [];

        };

        Editor.Math = function () {
            Editor.Problem.call(this);

            this.stem = {
                charts: [],
                figures: [],
                answer: null
            };

            this.keys = {
                variables: [],
                choices: [],
                answer: null
            };

            this.qtype = 0;
        };

        Editor.Reading = function () {
            Editor.Problem.call(this);

        };

        Editor.Writing = function () {
            Editor.Problem.call(this);

        };


        return Editor;
    }

})();
