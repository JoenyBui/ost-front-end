/**
 * Created by joeny on 12/4/16.
 */
(function () {
  'use strict';

  angular
    .module('app')
    .factory('Classroom', classroomFactory);

  function classroomFactory() {
    var Classroom = Classroom || {};

    Classroom.Test = function () {
      this.id = -1;
      this.name = '';
      this.teacher = null;
      this.problems = [];
    };

    Classroom.Test.prototype = {
      addProblem: function () {

      }
    };

    return Classroom;
  }
})();