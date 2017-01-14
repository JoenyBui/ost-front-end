(function () {
  'use strict';

  //TODO: For this to work, we need to have a resolve and load the data of the item before it enters.
  angular
    .module('app.editor')
    .controller('EditorMathPageController', EditorMathPageController);

  /* @ngInject */
  function EditorMathPageController($scope, $log, $mdDialog, $stateParams, $mdExpansionPanel, $mdToast,
                                    Editor, djangoAuth) {
    var vm = this;

    // Expansion of the panel.
    $mdExpansionPanel().waitFor('base').then(function (instance) {
      instance.expand();
    });

    vm.problemId = null;
    vm.autocompleteRequireMatch = true;

    // Initialize problem problem.
    vm.problem = new Editor.Math();

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
      vm.topicLists = data.map(function (top) {
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

      vm.editorLists = data.map(function (edi) {
        edi._lowername = edi.pen_name.toLowerCase();

        return edi;
      });

    }, function (reason) {
      $log.log(reason);
    });

    vm.transformChip = function (chip) {
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

    // Establish the toolbar for editor.
    vm.tinymceOptions = {
      plugins: 'link image code',
      toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
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
          // Open the data.
          vm.problem.open(data);

          if ('qtype' in data) {
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
          }

          if ('topics' in data) {
            promiseTopic.then(function () {
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
            });
          }

          if ('editors' in data) {
            promiseEditor.then(function () {
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
     *
     * */
    $scope.$on('save', function (ev) {
      vm.problem.status = vm.statusType.selectedItem;

      vm.problem.editors = [];
      for (var index in vm.editorItems) {
        var item = vm.editorItems[index];
        vm.problem.editors.push(item.id);
      }

      vm.problem.topics = [];
      for (var index in vm.topicItems) {
        var item = vm.topicItems[index];
        vm.problem.topics.push(item.id);
      }

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

    // $scope.$on('submitJob', function (ev) {
    //   var job = angular.copy(vm.problem);
    //
    //   job.status = vm.statusType.selectedItem;
    //
    //   job.editors = [];
    //   for (var index in vm.editorItems) {
    //     var item = vm.editorItems[index];
    //     job.editors.push(item.id);
    //   }
    //
    //   job.topics = [];
    //   for (var index in vm.topicItems) {
    //     var item = vm.topicItems[index];
    //     job.topics.push(item.id);
    //   }
    //
    //   job.qtype = vm.questionType.selectedItem;
    //
    //   // job.keys = {};
    //   if (job.qtype == Editor.TRUE_OF_FALSE) {
    //     /*True or False*/
    //     job.keys.answer = vm.questionType.tf.answer;
    //     job.keys.choices = null;
    //   }
    //   else if (job.qtype == Editor.MULTIPLE_CHOICE) {
    //     /*Multiple Choice*/
    //     job.keys.answer = vm.questionType.mc.answer;
    //     job.keys.choices = vm.questionType.mc.choices;
    //   }
    //   else if (job.qtype == Editor.FILL_IN_THE_BLANK) {
    //     /*Fill in the Blank*/
    //     job.keys.answer = vm.questionType.fib.answer;
    //     job.keys.choices = null;
    //   }
    //
    //   $mdDialog.show({
    //     templateUrl: 'app/editor/form/editor-submit.tmpl.html',
    //     targetEvent: ev,
    //     controller: 'EditorSubmitJobController',
    //     controllerAs: 'vm',
    //     locals: {
    //       job: job,
    //       requestUrl: 'v1/math/maths/'
    //     }
    //   }).then(function (args) {
    //     var job = args[0];
    //     var requestUrl = args[1];
    //     var method = args[2];
    //
    //     djangoAuth.request({
    //       method: method,
    //       url: requestUrl,
    //       data: job
    //     }).then(function (data) {
    //       $mdToast.show(
    //         $mdToast.simple()
    //           .textContent('Submit Job')
    //       );
    //     }, function (reason) {
    //       $mdToast.show(
    //         $mdToast.simple()
    //           .textContent(reason)
    //       );
    //     });
    //   })
    // });

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