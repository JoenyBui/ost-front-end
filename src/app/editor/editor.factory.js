/**
 * Created by joeny on 12/4/16.
 */
(function () {
	'use strict';

	angular
		.module('app')
		.factory('Editor', editorFactory);

	/**
	 * Editor Factory
	 *
	 * */
	function editorFactory() {
		var Editor = Editor || {};

		Editor.DOMAIN_MATH = 1000;
		Editor.DOMAIN_READING = 2000;
		Editor.DOMAIN_WRITING = 3000;

		Editor.UNASSIGNED = 0;
		Editor.FILL_IN_THE_BLANK = 1;
		Editor.TRUE_OF_FALSE = 2;
		Editor.MULTIPLE_CHOICE = 3;
		Editor.PROBLEM_SET = 4;
		Editor.SHORT_ANSWER = 5;
		Editor.MULTIPLE_ANSWER = 6;
		Editor.WORD_PROBLEM = 7;

		Editor.QTYPE_OPTIONS = [
			['Fill-in-the-Blank', Editor.FILL_IN_THE_BLANK],
			['True or False', Editor.TRUE_OF_FALSE],
			['Multiple Choice', Editor.MULTIPLE_CHOICE]
		];

		Editor.STATUS_CREATED = 0;
		Editor.STATUS_DRAFT = 1;
		Editor.STATUS_SUBMITTED = 2;
		Editor.STATUS_REVIEWED = 3;
		Editor.STATUS_PUBLISHED = 4;
		Editor.STATUS_REVISED = 5;
		Editor.STATUS_LOCK = 6;

		Editor.STATUS_OPTIONS = [
			['Created', Editor.STATUS_CREATED],
			['Draft', Editor.STATUS_DRAFT],
			['Submitted', Editor.STATUS_SUBMITTED],
			['Reviewed', Editor.STATUS_REVIEWED],
			['Published', Editor.STATUS_PUBLISHED],
			['Revised', Editor.STATUS_REVISED],
			['Lock', Editor.STATUS_LOCK]
		];

		Editor.STATUS_TYPE = {
			options: Editor.STATUS_OPTIONS,
			selectedItem: 0
		};

		Editor.TrueOrFalse = function () {
			this.answer = false;
		};

		Editor.MultipleChoice = function () {
			this.answer = null;
			this.choices = [
				null,
				null,
				null
			]
		};

		Editor.FillInTheBlank = function () {
			this.answer = null;
		};

		Editor.QUESTION_TYPE_OPTIONS = {
			options: Editor.QTYPE_OPTIONS,
			selectedItem: 0,
			tf: new Editor.TrueOrFalse(),
			mc: new Editor.MultipleChoice(),
			fib: new Editor.FillInTheBlank()
		};

		/**
		 * Variables
		 *
		 * @param name:
		 * @param value:
		 * @param type:
		 * */
		Editor.Variables = function (name, value, type) {
			this.name = name;
			this.value = value;
			this.type = type;
		};

		/**
		 * Problem Base
		 *
		 * */
		Editor.Problem = function () {
			/**
			 *
			 * @param id:
			 * @param name:
			 * @param editors:
			 * @param status:
			 * @param domain:
			 * @param topics:
			 * */

			this.id = -1;
			this.name = "";
			this.editors = [];
			this.status = 0;
			this.domain = -1;
			this.topics = [];
		};

		Editor.Problem.prototype = {
			open: function (data) {
				if ('id' in data) {
					this.id = data.id;
				}

				if ('name' in data) {
					this.name = data.name;
				}

				if ('editors' in data) {
					this.editors = data.editors;
				}

				if ('status' in data) {
					this.status = data.status;
				}

				if ('domain' in data) {
					this.domain = data.domain
				}

				if ('topics' in data) {
					this.topics = data.topics;
				}
			}
		};

		/**
		 * Math Problem
		 *
		 * */
		Editor.Math = function () {
			Editor.Problem.call(this);

			this.domain = Editor.DOMAIN_MATH;
			
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

			this.qtype = 1;
		};

		Editor.Math.prototype = {
			default: function () {
				this.id = -1;
				this.name = 'Test Problem';
				this.stem.statement = 'Tell if the fraction on the left is less or greater than the fraction on the right.';
				this.keys.answer = 0;
				this.keys.choices = [
					"2/3",
					"3/5"
				];

				this.variables.push(new Editor.Variables('numerator', 1, 'whole'));
				this.variables.push(new Editor.Variables('denominator', 2, 'whole'));
			},

			/**
			 * Open problem
			 *
			 * */
			open: function (data) {
				Editor.Problem.prototype.open.call(this, data);

				if ('stem' in data) {
					this.stem = data.stem;
				}

				if ('keys' in data) {
					this.keys = data.keys;
				}

				if ('qtype' in data) {
					this.qtype = data.qtype;
				}
			}
		};

		/**
		 * Reading Problem
		 *
		 * */
		Editor.Reading = function () {
			Editor.Problem.call(this);

			this.domain = Editor.DOMAIN_READING;
		};

		/**
		 * Write Problem
		 *
		 * */
		Editor.Writing = function () {
			Editor.Problem.call(this);

			this.domain = Editor.DOMAIN_WRITING;
		};

		Editor.Topic = function () {

		};

    Editor.ProblemItem = function () {
			this.id = -1;
			this.stem = "";
			this.choices = null;
			this.answer = null;
    };

    Editor.ProblemItem.prototype = {
    	'open': function (data) {
				this.stem = data.stem;
				this.choices = data.choices;
				this.answer = data.answer;
      }
		};

		Editor.ProblemInstance = function () {
			this.id = -1;
			this.root = -1;
			this.data = {
				keys: {},
				index: 0
			};
      this.info = {};
      this.links = {};

      this.item = {};
		};

		Editor.ProblemInstance.prototype = {
			open: function (data) {
				this.id = data.id;
				this.root = data.root;
				this.data = data.data;
				this.info = data.info;
				this.links = data.links;

        this.item = new Editor.ProblemItem();
        this.item.open(this.info.base[this.data.index]);
			},
			
			switchItem: function (index) {
        this.item = new Editor.ProblemItem();
        this.item.open(this.info.base[index]);
      }
		};

		return Editor;
	}
})();
