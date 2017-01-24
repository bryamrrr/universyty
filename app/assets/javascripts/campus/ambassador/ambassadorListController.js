angular.module("campus-app").controller("AmbassadorListController", AmbassadorListController);

AmbassadorListController.$inject = ['$scope', 'urls', 'HttpRequest', 'CookieService'];

function AmbassadorListController($scope, urls, HttpRequest, CookieService) {
  var url = urls.BASE_API + '/teams/' + CookieService.read('nickname') + '/ambassadors'
  var promise = HttpRequest.send('GET', url);

  promise.then(function (response) {
    $scope.data = response;
    console.log(response);
    var $contenido = $('#contenido');
    $contenido.addClass("loaded");
  }, function (error) {
    console.log(error);
  });
}