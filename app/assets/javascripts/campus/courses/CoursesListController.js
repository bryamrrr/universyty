angular.module("campus-app").controller("CoursesListController", CoursesListController);

CoursesListController.$inject = ['$scope', 'urls', 'HttpRequest', 'CookieService'];

function CoursesListController($scope, urls, HttpRequest, CookieService) {
  var url = urls.BASE_API + '/enrollments/users/' + CookieService.read('nickname');
  var promise = HttpRequest.send('GET', url);

  promise.then(function (response) {
    console.log(response);
    var $contenido = $('#contenido');
    $contenido.addClass("loaded");
    $scope.enrollments = response;
  }, function (error) {
    console.log(error);
  });

  var $contenido = $('#contenido');
  $contenido.addClass("loaded");
}