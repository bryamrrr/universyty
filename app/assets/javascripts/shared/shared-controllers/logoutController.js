angular.module("shared").controller("LogoutController", LogoutController);

LogoutController.$inject = ['$scope', '$state', 'CookieService', 'HttpRequest', 'urls'];
function LogoutController($scope, $state, CookieService, HttpRequest, urls){
  console.log()
  $scope.logout = function() {
    var url = urls.BASE_API + '/users/logout';
    var data = {token: CookieService.read('token')};
    var promesa = HttpRequest.send("POST", url, data);
    promesa.then(function (data) {
      CookieService.remove('token');
      CookieService.remove('nickname');
      CookieService.remove('role');

      var location = window.location;
      var baseUrl = location.protocol + "//" + location.host + "/";
      window.location.href = baseUrl + "login";
    }, function(error){
      CookieService.remove('token');
      CookieService.remove('nickname');
      CookieService.remove('role');

      var location = window.location;
      var baseUrl = location.protocol + "//" + location.host + "/";
      window.location.href = baseUrl + "login";
    });
  }
}