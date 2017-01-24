angular.module("campus-app").controller("AmbassadorPreferencialController", AmbassadorPreferencialController);

AmbassadorPreferencialController.$inject = ['$scope', 'urls', 'HttpRequest', 'CookieService'];

function AmbassadorPreferencialController($scope, urls, HttpRequest, CookieService) {
  var url = urls.BASE_API + '/teams/' + CookieService.read('nickname') + '/students'
  var promise = HttpRequest.send('GET', url);

  promise.then(function (response) {
    $scope.students = response;
    console.log(response);
    var $contenido = $('#contenido');
    $contenido.addClass("loaded");
  }, function (error) {
    console.log(error);
  });
}