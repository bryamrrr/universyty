angular.module('campus-app').config(config);

config.$inject = ['$httpProvider', '$validatorProvider'];
function config($httpProvider, $validatorProvider) {
  // -----------------------------------
  // ADD RULE FOR REGEX VALIDATE
  // -----------------------------------
  $validatorProvider.addMethod("regex", function (value, element, regexp) {
      var re = new RegExp(regexp);
      return this.optional(element) || re.test(value);
  }, "");

  $httpProvider.interceptors.push(['$q', '$location', 'CookieService', function ($q, $location, CookieService) {
    return {
     'request': function (config) {
         config.headers = config.headers || {};
         if (CookieService.read('token')) {
             config.headers.Authorization = 'Bearer ' + CookieService.read('token');
         }
         return config;
     },
     'responseError': function (response) {

         if (response.status === 401 || response.status === 403) {
             CookieService.remove('token');
             CookieService.remove('nickname');
             CookieService.remove('role');
             $location.path('/login');

         }
         return $q.reject(response);

     }
    };
  }]);
}