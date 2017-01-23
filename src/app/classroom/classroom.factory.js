/**
 * Created by joeny on 12/4/16.
 */
(function () {
  'use strict';

  angular
    .module('app')
    .factory('Classroom', classroomFactory);

  function classroomFactory(Editor, djangoAuth) {
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
          var instance = new Editor.ProblemInstance();
          instance.root = list[i];

          promises.push(
            djangoAuth.request({
              method: 'POST',
              url: 'v1/problem/problem-instance/',
              data: instance
            }).then(function (data) {
              vm.problems.push(data.id);

            }, function (reason) {
              $log.log(reason);
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
      this.created = null;
      this.modified = null;
      this.info = null;
    };


    Classroom.PupilTest.prototype = {
      open: function (data) {
        this.id = data.id;
        this.student = data.student;
        this.exam = data.exam;
        this.answers = data.answer;
        this.results = data.results;
        this.grade = data.grade;
        this.status = data.status;
        this.created = data.created;
        this.modified = data.modified;

        this.info = data.info;
      },

      shuffle: function (a) {
        var j, x, i;
        for (i = a.length; i; i--) {
          j = Math.floor(Math.random() * i);
          x = a[i - 1];
          a[i - 1] = a[j];
          a[j] = x;
        }

        return a;
      }
    };

    return Classroom;
  }
})();