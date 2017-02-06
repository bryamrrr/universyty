angular.module("campus-app").controller("CoursesQuizController", CoursesQuizController);

CoursesQuizController.$inject = ['$scope', '$stateParams', '$state', 'urls', 'CookieService', 'HttpRequest'];

function CoursesQuizController($scope, $stateParams, $state, urls, CookieService, HttpRequest) {
  $scope.number = $stateParams.number;
  $scope.id = $stateParams.id;
  $scope.part = $stateParams.part;
  $scope.$parent.showCheck = false;


  var url = urls.BASE_API + '/parts/' + $scope.part + '/questions';
  var promise = HttpRequest.send('GET', url);

  promise.then(function (response) {
    $scope.questions = response.questions;
    var $contenido = $('#contenido');
    $contenido.addClass("loaded");
  }, function (error) {
    console.log(error);
  });
}