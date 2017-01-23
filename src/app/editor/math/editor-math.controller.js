(function () {
  'use strict';

  angular
    .module('app.editor')
    .controller('EditorMathPageController', EditorMathPageController);

  /* @ngInject */
  function EditorMathPageController($scope, $log, $mdDialog, $stateParams, $mdExpansionPanel, $mdToast,
                                    Editor, djangoAuth, loadItem) {
    var vm = this;

    // Expansion of the panel.
    $mdExpansionPanel().waitFor('base').then(function (instance) {
      instance.expand();
    });

    // vm.problemId = null;
    vm.autocompleteRequireMatch = true;

    // Initialize problem problem.
    vm.problem = loadItem;

    // ====================================================
    // Status
    // ====================================================
    vm.statusType = Editor.STATUS_TYPE;

    // ====================================================
    // Question Type
    // ====================================================

    vm.questionType = Editor.QUESTION_TYPE_OPTIONS;
    vm.qtype_options = Editor.QTYPE_OPTIONS;

    vm.add_mc_item = function () {
      vm.questionType.mc.choices.push(null)
    };

    vm.remove_mc_item = function (item) {
      for (var i = vm.questionType.mc.choices.length - 1; i >= 0; i--) {
        if (vm.questionType.mc.choices[i] === item) {
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
      for (var i = vm.problem.keys.variables.length - 1; i >= 0; i--) {
        if (vm.problem.keys.variables[i] === variable) {
          vm.problem.keys.variables.splice(i, 1);
        }
      }
    };

    if (vm.problem.qtype == Editor.TRUE_OF_FALSE) {
      /*True or False*/
      vm.questionType.tf.answer = vm.problem.keys.answer;
      vm.questionType.tf.choices = null;
    }
    else if (vm.problem.qtype == Editor.MULTIPLE_CHOICE) {
      /*Multiple Choice*/
      vm.questionType.mc.answer = vm.problem.keys.answer;
      vm.questionType.mc.choices = vm.problem.keys.choices;
    }
    else if (vm.problem.qtype == Editor.FILL_IN_THE_BLANK) {
      /*Fill in the Blank*/
      vm.questionType.fib.answer = vm.problem.keys.answer;
      vm.questionType.fib.choices = null;
    }

    /*
     * Broadcast Function
     *
     * */
    $scope.$on('save', function (ev) {
      vm.problem.status = vm.statusType.selectedItem;

      if (vm.problem.qtype == Editor.TRUE_OF_FALSE) {
        /*True or False*/
        vm.problem.keys.answer = vm.questionType.tf.answer;
        vm.problem.keys.choices = null;
      }
      else if (vm.problem.qtype == Editor.MULTIPLE_CHOICE) {
        /*Multiple Choice*/
        vm.problem.keys.answer = vm.questionType.mc.answer;
        vm.problem.keys.choices = vm.questionType.mc.choices;
      }
      else if (vm.problem.qtype == Editor.FILL_IN_THE_BLANK) {
        /*Fill in the Blank*/
        vm.problem.keys.answer = vm.questionType.fib.answer;
        vm.problem.keys.choices = null;
      }

      // Save job file.
      djangoAuth.request({
        method: 'PUT',
        url: 'v1/math/maths/' + vm.problem.id + '/',
        data: vm.problem
      }).then(function (data) {
        $mdToast.show(
          $mdToast.simple()
            .textContent('Save Job')
        );
      }, function (reason) {
        $mdToast.show(
          $mdToast.simple()
            .textContent(reason)
        );
      });
    });

    // Add Variable
    $scope.$on('addVariable', function (ev) {
      $mdDialog.show({
        templateUrl: 'app/editor/form/editor-variable.tmpl.html',
        targetEvent: ev,
        controller: 'EditorVariableDialogController',
        controllerAs: 'vm',
        locals: {
          variable: null
        }
      }).then(function (answer) {
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