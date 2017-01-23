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
      addProblems: function (list) {
        var promises = [];

        for (var i=0; i < list.length; i++) {
          promises.push(
            djangoAuth.request({
              method: 'POST',
              url: 'v1/problem/problem-instance/',
              data: {
                root: list[i]
              }
            }).then(function (data) {
              this.problems.push(data.id);

            }, function (reason) {

            })
          );
        }

        // Return list of promises.
        return promises;
      },
      
      save: function () {
        return djangoAuth.request({
          method: 'PUT',
          url: 'v1/classroom/exam-problems/',
          data: this
        }).then(function (data) {
          
        }, function (reason) {
          
        })
      }
    };

    return Classroom;
  }
})();