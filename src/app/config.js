(function () { 
 return angular.module("app")
.constant("ENV_VARS", {"URL_PATH":"http://localhost:3000/","URL_DOMAIN":"www.mywaterbuffalo","DEBUG":"false","VERSION":"debug"})
.constant("API_CONFIG", {"url":"http://127.0.0.1:8000/","path":"http://localhost:3000/","domain":"localhost","accounts":"rest-auth/"})
.constant("GLOBAL_SETTINGS", {"debug":false,"version":".debug"});

})();
