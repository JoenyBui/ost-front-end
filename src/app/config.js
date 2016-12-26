(function () { 
 return angular.module("app")
.constant("ENV_VARS", {"apiUrl":"https://api.mywaterbuffalo.com","debug":"False","version":"0.0.2"})
.constant("API_CONFIG", {"url":"http://127.0.0.1:8000","path":"http://localhost:3000/","domain":"localhost"})
.constant("GLOBAL_SETTINGS", {"debug":null,"version":".debug"});

})();
