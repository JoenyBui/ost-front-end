/**
 * Created by jbui on 11/10/2015.
 */
(function () {
    'use strict';

    angular
        .module('app')
        .service('djangoAuth', djangoAuth);

    function djangoAuth($q, $http, $cookies, $rootScope, $log) {
        // AngularJS will instantiate a singleton by calling "new" on this function.
        var vm = this;

        vm.service = {
            /* START CUSTOMIZATION HERE */
            // Change this to point to your Django REST Auth API
            // e.g. /api/rest-auth  (DO NOT INCLUDE ENDING SLASH)
            'API_URL': '',

            // Set use_session to true to use Django sessions to store security token.
            // Set use_session to false to store the security token locally and transmit it as a custom header.
            'use_session': true,

            'user': {
                'username': '',
                'avatar': 'assets/images/avatars/avatar-5.png',
                'email': '',
                'first_name': '',
                'last_name': ''
            },

            /* END OF CUSTOMIZATION */
            'authenticated': null,
            'authPromise': null,
            'request': function(args) {
                // Let's retrieve the token from the cookie, if available
                //if($cookies.token){
                //    $http.defaults.headers.common.Authorization = 'Token ' + $cookies.token;
                //}
                //
                var headers = {};

                if($cookies.get('token')) {
                    $http.defaults.headers.common.Authorization = 'Token ' + $cookies.get('token');

                    headers['X-CSRFToken'] = $cookies['csrftoken'];
                }

                // Continue
                params = args.params || {};
                args = args || {};
                var deferred = $q.defer(),
                    url = this.API_URL + args.url,
                    method = args.method || "GET",
                    params = params,
                    data = args.data || {};

                // Fire the request, as configured.
                $http({
                    url: url,
                    withCredentials: this.use_session,
                    method: method.toUpperCase(),
                    headers: headers,
                    params: params,
                    data: data
                })
                .success(angular.bind(this,function(data, status, headers, config) {
                    deferred.resolve(data, status);
                }))
                .error(angular.bind(this,function(data, status, headers, config) {
                    $log.log('status' + status);
                    $log.log(data);
                    $log.log('error syncing with: ' + url);

                    // Set request status
                    if(data){
                        data.status = status;
                    }

                    if(status == 0){
                        if(data == ''){
                            data = {};
                            data['status'] = 0;
                            data['non_field_errors'] = ['Could not connect. Please try again.'];
                        }
                        // or if the data is null, then there was a timeout.
                        if(data == null){
                            // Inject a non field error alerting the user
                            // that there's been a timeout error.
                            data = {};
                            data['status'] = 0;
                            data['non_field_errors'] = ['Server timed out. Please try again.'];
                        }
                    }

                    deferred.reject(data, status, headers, config);
                }));

                return deferred.promise;
            },
            'register': function(username,password1,password2,email,more){
                var data = {
                    'username':username,
                    'password1':password1,
                    'password2':password2,
                    'email':email
                };

                data = angular.extend(data,more);
                return this.request({
                    'method': "POST",
                    'url': "/rest-auth/registration/",
                    'data' :data
                });
            },
            'login': function(username,password){
                var djangoAuth = this;

                return this.request({
                    'method': 'POST',
                    'url': '/rest-auth/login/',
                    'data':{
                        'username':username,
                        'password':password
                    }
                }).then(function(data){
                    if(!djangoAuth.use_session){
                        $http.defaults.headers.common.Authorization = 'Token ' + data.key;
                        //$cookies.token = data.key;

                        var now = new Date();

                        // this will set the expiration to 12 months
                        var exp = new Date(now.getFullYear(), now.getMonth(), now.getDate()+7);

                        $cookies.put('token', data.key, {expires: exp} );
                    }

                    djangoAuth.setProfile();

                    djangoAuth.authenticated = true;
                    $rootScope.$broadcast('djangoAuth.logged_in', data);
                }, function(reason) {
                    console.log(reason);
                    throw(reason);
                });
            },
            'logged_in': function (data) {
                $log.log(data);
            },
            'logout': function(){
                var djangoAuth = this;
                return this.request({
                    'method': 'POST',
                    'url': '/rest-auth/logout/'
                }).then(function(data){
                    delete $http.defaults.headers.common.Authorization;
                    //delete $cookies.token;

                    $cookies.remove('token');

                    djangoAuth.authenticated = false;
                    $rootScope.$broadcast("djangoAuth.logged_out");
                });
            },
            'changePassword': function(password1, password2){
                return this.request({
                    'method': "POST",
                    'url': "/rest-auth/password/change/",
                    'data':{
                        'new_password1':password1,
                        'new_password2':password2
                    }
                });
            },
            'resetPassword': function(email){
                return this.request({
                    'method': "POST",
                    'url': "/rest-auth/password/reset/",
                    'data':{
                        'email':email
                    }
                });
            },
            'profile': function(){
                return this.request({
                    'method': "GET",
                    'url': "/core/profile/"
                });
            },
            'updateProfile': function(data){
                return this.request({
                    'method': "PATCH",
                    'url': "/rest-auth/user/",
                    'data':data
                });
            },
            'verify': function(key){
                return this.request({
                    'method': "POST",
                    'url': "/rest-auth/registration/verify-email/",
                    'data': {'key': key}
                });
            },
            'confirmReset': function(uid,token,password1,password2){
                return this.request({
                    'method': "POST",
                    'url': "/rest-auth/password/reset/confirm/",
                    'data':{
                        'uid': uid,
                        'token': token,
                        'new_password1':password1,
                        'new_password2':password2
                    }
                });
            },
            'setProfile': function () {
                var da = this;

                return vm.service.profile()
                    .then(function (data) {
                        da.user['username'] = data['username'];
                        da.user['email'] = data['email'];
                        da.user['first_name'] = data['first_name'];
                        da.user['last_name'] = data['last_name'];

                        da.user["bio"] = data["bio"];
                        da.user["location"] = data['location'];
                        da.user['birth_date'] = data['birth_date'];
                        da.user['website'] = data['website'];
                        da.user['twitter'] = data['twitter'];
                        da.user['avatar'] = data['avatar'];

                    });
            },
            'authenticationStatus': function(restrict, force){
                // Set restrict to true to reject the promise if not logged in
                // Set to false or omit to resolve when status is known
                // Set force to true to ignore stored value and query API
                restrict = restrict || false;
                force = force || false;
                if(this.authPromise == null || force){
                    this.authPromise = this.request({
                        'method': 'GET',
                        'url': '/rest-auth/user/'
                    })
                }
                var da = this;
                var getAuthStatus = $q.defer();
                if(this.authenticated != null && !force){
                    // We have a stored value which means we can pass it back right away.
                    if(this.authenticated == false && restrict){
                        getAuthStatus.reject("User is not logged in.");
                    }else{
                        getAuthStatus.resolve();

                        da.setProfile();
                    }
                }else{
                    // There isn't a stored value, or we're forcing a request back to
                    // the API to get the authentication status.
                    this.authPromise.then(function(){
                        da.authenticated = true;

                        da.setProfile();

                        getAuthStatus.resolve();
                    },function(){
                        da.authenticated = false;
                        if(restrict){
                            getAuthStatus.reject("User is not logged in.");
                        }else{
                            getAuthStatus.resolve();
                        }
                    });
                }
                return getAuthStatus.promise;
            },
            'initialize': function(url, sessions){
                this.API_URL = url;
                this.use_session = sessions;

                // Check to see if there is a token.
                if($cookies.get('token')) {
                    // Assume that a token means it's authenticated.
                    // Now let's check if that is true.
                    this.authenticated = true;

                    var da = this;
                    vm.service.profile()
                        .then(function (data) {
                            da.setProfile(data);
                                // da.user['username'] = data['username'];
                                // da.user['email'] = data['email'];
                                // da.user['first_name'] = data['first_name'];
                                // da.user['last_name'] = data['last_name'];
                                //
                                // da.user["bio"] = data["bio"];
                                // da.user["location"] = data['location'];
                                // da.user['birth_date'] = data['birth_date'];
                                // da.user['website'] = data['website'];
                                // da.user['twitter'] = data['twitter'];
                                // da.user['avatar'] = data['avatar'];

                            }, function (reason) {
                                delete $http.defaults.headers.common.Authorization;

                                $cookies.remove('token');

                                da.authenticated = false;
                                $rootScope.$broadcast("djangoAuth.logged_out");
                            }
                        );
                }
                else {
                    // No tokens means not authenticated.
                    this.authenticated = false;
                }
                return this.authenticationStatus();
            }
        };

        return vm.service;
    }
})();
