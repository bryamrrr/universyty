angular.module("admin-app").controller("WelcomeHomeController", WelcomeHomeController);

WelcomeHomeController.$inject = ['$scope', 'urls', 'HttpRequest', 'toastr'];

function WelcomeHomeController($scope, urls, HttpRequest, toastr) {
  var url = urls.BASE_API + '/users/totals/all';
  var promise = HttpRequest.send('GET', url);

  promise.then(function (response) {
    $scope.data = response;

    var $contenido = $('#contenido');
    $contenido.addClass("loaded");
  }, function (error) {
    toastr.error('Hubo un error');
  });
}