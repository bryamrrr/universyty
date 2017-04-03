angular.module("admin-app").controller("UserLevelController", UserLevelController);

UserLevelController.$inject = ['$scope', '$stateParams', 'urls', 'HttpRequest', 'CookieService'];

function UserLevelController($scope, $stateParams, urls, HttpRequest, CookieService) {
  $scope.level = $stateParams.level;

  var url = urls.BASE_API + '/teams/' + $stateParams.nickname + '/ambassadors/' + $stateParams.level;
  var promise = HttpRequest.send('GET', url);

  promise.then(function (response) {
    $scope.ambassadors = response;
    console.log(response);
    var $contenido = $('#contenido');
    $contenido.addClass("loaded");
  }, function (error) {
    console.log(error);
  });
}