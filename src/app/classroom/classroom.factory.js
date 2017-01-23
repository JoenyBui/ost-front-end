/**
 * Created by joeny on 12/4/16.
 */
(function () {
  'use strict';

  angular
    .module('app')
    .factory('Classroom', classroomFactory);

  function classroomFactory(djangoAuth) {
    var Classroom = Classroom || {};

    Classroom.Sensei = function () {
      this.id = -1;
      this.name = "";
    };

    Classroom.Test = function () {
      this.id = -1;
      this.name = '';
      this.teacher = null;
      this.problems = [];
    };

    Classroom.Test.prototype = {
      addProblems: function (list) {
        var promises = [];
        var vm = this;

        for (var i=0; i < list.length; i++) {
          promises.push(
            djangoAuth.request({
              method: 'POST',
              url: 'v1/problem/problem-instance/',
              data: {
                root: list[i]
              }
            }).then(function (data) {
              vm.problems.push(data.id);

            }, function (reason) {

            })
          );
        }

        // Return list of promises.
        return promises;
      },

      open: function (data) {
        this.id = data.id;
        this.name = data.name;
        this.teacher = data.teacher;
        this.problems = data.problems;

      },
      
      save: function () {
        return djangoAuth.request({
          method: 'PUT',
          url: 'v1/classroom/exam-problems/' + this.id + '/',
          data: this
        })
      }
    };

    Classroom.Pupil = function () {
      this.id = -1;
      this.name = null;
    };

    Classroom.PupilTest = function () {
      this.id = -1;
      this.student = -1;
      this.exam = -1;
      this.answers = {};
      this.results = {};
      this.grade = -1.0;
      this.status = 0;
    };


    Classroom.PupilTest.prototype = {
      open: function (data) {
        this.id = data.id;

      }
    };

    return Classroom;
  }
})();