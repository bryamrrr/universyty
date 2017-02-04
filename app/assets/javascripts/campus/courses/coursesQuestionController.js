angular.module("campus-app").controller("CoursesQuestionController", CoursesQuestionController);

CoursesQuestionController.$inject = ['$scope', '$stateParams', '$state', 'urls', 'CookieService', 'HttpRequest', 'toastr'];

function CoursesQuestionController($scope, $stateParams, $state, urls, CookieService, HttpRequest, toastr) {
  $scope.select = select;
  $scope.isSelected = isSelected;
  $scope.alphabet = ['A', 'B', 'C', 'D', 'E'];
  $scope.showCheck = false;
  $scope.check = check;
  $scope.next = next;

  var questionId = $stateParams.question;
  var url = urls.BASE_API + '/questions/' + questionId;
  var promise = HttpRequest.send('GET', url);

  promise.then(function (response) {
    $scope.question = response.question;
    $scope.next_question = response.next_question;
    console.log(response);
    var $contenido = $('#contenido');
    $contenido.addClass("loaded");
  }, function (error) {
    console.log(error);
  });

  function select(alternative) {
    if (!$scope.showCheck) $scope.alternativeSelected = alternative;
  }

  function isSelected(alternative) {
    return alternative === $scope.alternativeSelected;
  }

  function check() {
    // var answersNeeded = $scope.question.answers_number;
    // var answersFound = 0;

    if (!$scope.alternativeSelected) {
      toastr.error('Por favor, selecciona una alternativa');
    } else {
      $scope.showCheck = true;
    }
  }

  function next(question) {
    // var url = urls.BASE_API + '/questions/' + question.id + '/check/' + $scope.alternativeSelected.id;
    // var promise = HttpRequest.send('GET', url);

    // promise.then(function (response) {
    //   console.log(response);
    // }, function (error) {
    //   console.log(error);
    // });
    $state.go('courses.question', { id: $stateParams.id, part: question.part_id, question: $scope.next_question.id })
  }
}