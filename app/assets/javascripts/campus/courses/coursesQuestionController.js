angular.module("campus-app").controller("CoursesQuestionController", CoursesQuestionController);

CoursesQuestionController.$inject = ['$scope', '$stateParams', '$state', 'urls', 'CookieService', 'HttpRequest'];

function CoursesQuestionController($scope, $stateParams, $state, urls, CookieService, HttpRequest) {
  $scope.select = select;
  $scope.isSelected = isSelected;
  $scope.alphabet = ['A', 'B', 'C', 'D', 'E'];

  var questionId = $stateParams.question;
  var url = urls.BASE_API + '/questions/' + questionId;
  var promise = HttpRequest.send('GET', url);

  promise.then(function (response) {
    $scope.question = response;
    console.log(response);
    var $contenido = $('#contenido');
    $contenido.addClass("loaded");
  }, function (error) {
    console.log(error);
  });

  function select(alternative) {
    $scope.alternativeSelected = alternative;
  }

  function isSelected(alternative) {
    return alternative === $scope.alternativeSelected;
  }
}