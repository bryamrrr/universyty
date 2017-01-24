angular.module("campus-app").controller("AmbassadorLevelController", AmbassadorLevelController);

AmbassadorLevelController.$inject = ['$scope', '$stateParams', 'urls', 'HttpRequest', 'CookieService'];

function AmbassadorLevelController($scope, $stateParams, urls, HttpRequest, CookieService) {
  $scope.level = $stateParams.level;

  var url = urls.BASE_API + '/teams/' + CookieService.read('nickname') + '/ambassadors/' + $stateParams.level;
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