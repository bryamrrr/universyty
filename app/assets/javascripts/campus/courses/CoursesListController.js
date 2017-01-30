angular.module("campus-app").controller("CoursesListController", CoursesListController);

CoursesListController.$inject = ['$scope', '$state', 'urls', 'HttpRequest', 'CookieService'];

function CoursesListController($scope, $state, urls, HttpRequest, CookieService) {
  $scope.goToCourse = goToCourse;

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

  function goToCourse(enrollment) {
    console.log(enrollment);

    if (enrollment.current_video) {
      console.log('redirigirlo al video exacto')
    } else {
      $state.go('courses.view', { id: enrollment.course_id, topic: 0 })
    }
  }
}