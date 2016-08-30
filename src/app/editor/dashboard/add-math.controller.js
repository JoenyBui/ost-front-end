/**
 * Created by joeny on 8/30/16.
 */
(function () {
    angular
        .module('app.editor')
        .controller('AddMathDialogController', AddMathDialogController);

    function AddMathDialogController($rootScope, $log, djangoAuth) {
        var vm = this;

        vm.problem = {
            id: -1,
            name: '',
            domain: 1000,
            stem: {},
            keys: {}
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
    }
})();
