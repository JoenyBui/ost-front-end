/**
 * Created by joeny on 9/25/16.
 */

// Be descriptive with titles here. The describe and it titles combined read like a sentence.
describe('Django Authentication Login Service', function() {
    var mockQ, mockHttp, mockCookies, mockRootScope, mockLog, mockDjangoAuth, mkHttpBackend;

    beforeEach(function () {
        module(function ($provide) {
            // $provide.

        });

        module('app');
    });

    beforeEach(inject(function ($q, $http, $httpBackend, $cookies, $rootScope, $log, djangoAuth) {
        mockQ = $q;
        mockHttp = $http;
        mockCookies = $cookies;
        mockRootScope = $rootScope;
        mockLog = $log;

        mkHttpBackend = $httpBackend;
        // mkHttpBackend.when("GET", "http://example.com/api/movies").respond([{}, {}, {}]);
        mkHttpBackend.whenGET('http://www.google.com').respond(200, '');

        mkHttpBackend.when("POST", "/rest-auth/login/").respond([{}, {}, {}]);

        mockDjangoAuth = djangoAuth;

        mockDjangoAuth.API_URL = "http://example.com/";

    }));

    it('shows API_URL', function() {
        // An intentionally failing test. No code within expect() will never equal 4.
        expect(mockDjangoAuth.API_URL).toEqual("http://example.com/");
    });

    it('test_flush', function () {
        // mockDjangoAuth.login('GeorgeHBush', 'NoNewTaxes');

        // mkHttpBackend.when("POST", "http://example.com/rest-auth/login").respond([{}, {}, {}]);
        mkHttpBackend.flush();
        expect(3).toBe(3);
    });
});
