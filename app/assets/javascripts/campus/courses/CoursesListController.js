angular.module("campus-app").controller("CoursesListController", CoursesListController);

CoursesListController.$inject = ['$scope', '$state', 'urls', 'HttpRequest', 'CookieService'];

function CoursesListController($scope, $state, urls, HttpRequest, CookieService) {
  var url = urls.BASE_API + '/enrollments/users/' + CookieService.read('nickname');
  var promise = HttpRequest.send('GET', url);

  promise.then(function (response) {
    console.log(response);
    var $contenido = $('#contenido');
    $contenido.addClass("loaded");
    $scope.enrollments = response.enrollments;
    $scope.percentages = response.percentages;
  }, function (error) {
    console.log(error);
  });
}