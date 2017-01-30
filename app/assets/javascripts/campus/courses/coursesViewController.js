angular.module("campus-app").controller("CoursesViewController", CoursesViewController);

CoursesViewController.$inject = ['$scope', '$stateParams', 'urls', 'HttpRequest'];

function CoursesViewController($scope, $stateParams, urls, HttpRequest) {
  var idCourse = $stateParams.id;

  var url = urls.BASE_API + '/courses/' + idCourse;
  var promise = HttpRequest.send('GET', url);

  promise.then(function (response) {
    $scope.course = response.course;
    $scope.parts = response.parts;
    console.log(response);
    var $contenido = $('#contenido');
    $contenido.addClass("loaded");
  }, function (error) {
    console.log(error);
  })
}