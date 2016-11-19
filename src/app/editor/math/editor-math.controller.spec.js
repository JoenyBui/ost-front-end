/**
 * Created by joeny on 9/28/16.
 */
describe('Editor Math Controller', function () {
    var scope, location, ctrl;

    beforeEach(function () {
        module(function ($provide) {

        });

        module('app');
        // module('app.editor');
    });

    beforeEach(inject(function ($rootScope, $controller) {
        scope = $rootScope.$new();

        // Return the controller as needed.
        ctrl = function(ctrlName) {
            return $controller(ctrlName, {
                $scope: scope
            });
        }
    }));

    it('Check problem id.', function() {
        var controller = ctrl('EditorMathPageController');

        // An intentionally failing test. No code within expect() will never equal 4.
        expect(controller.problemId).toEqual(null);
    });

});