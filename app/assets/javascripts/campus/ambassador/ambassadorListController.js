angular.module("campus-app").controller("AmbassadorListController", AmbassadorListController);

AmbassadorListController.$inject = ['$scope', 'urls', 'HttpRequest', 'CookieService'];

function AmbassadorListController($scope, urls, HttpRequest, CookieService) {
  $scope.searchAmbassador = searchAmbassador;
  $scope.member = false;
  $scope.not_member = false;

  var url = urls.BASE_API + '/teams/' + CookieService.read('nickname') + '/ambassadors'
  var promise = HttpRequest.send('GET', url);

  promise.then(function (response) {
    $scope.data = response;
    var $contenido = $('#contenido');
    $contenido.addClass("loaded");
  }, function (error) {
    console.log(error);
  });

  function searchAmbassador(text) {
    var url = urls.BASE_API + '/teams/search/' + text;
    var promise = HttpRequest.send('GET', url);

    promise.then(function (response) {
      $scope.not_member = false;
      $scope.member = true;
      $scope.user_nickname = response.nickname;
      $scope.user_level = response.level;
      $scope.user_active = response.active;
    }, function (error) {
      $scope.not_member = true;
      $scope.user_nickname = text;
      $scope.member = false;
      $scope.user_active = false;
    });
  }
}