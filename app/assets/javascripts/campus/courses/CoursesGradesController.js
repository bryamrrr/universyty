angular.module("campus-app").controller("CoursesGradesController", CoursesGradesController);

CoursesGradesController.$inject = ['$scope', 'urls', 'HttpRequest'];

function CoursesGradesController($scope, urls, HttpRequest) {
  var url = urls.BASE_API + '/enrollments/find_completed';
  var promise = HttpRequest.send('GET', url);

  promise.then(function (response) {
    console.log(response);
    var $contenido = $('#contenido');
    $contenido.addClass("loaded");
    $scope.enrollments = response;
  }, function (error) {
    console.log(error);
  });
}