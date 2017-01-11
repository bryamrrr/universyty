angular.module("admin-app").controller("QuizController", QuizController);

QuizController.$inject = ['$scope', '$stateParams', 'urls', 'HttpRequest'];

function QuizController($scope, $stateParams, urls, HttpRequest) {
  $scope.addQuestion = addQuestion;
  $scope.addAlternative = addAlternative;

  var moduleId = $stateParams.id;

  var url = urls.BASE_API + '/quizzes/' + moduleId;
  var promise = HttpRequest.send("GET", url);

  promise.then(function (response) {
    if (response.quiz) {

    } else {
      $scope.quiz = {
        questions: []
      }
    }
    $scope.module = response.part;
    $scope.course = response.course;

    var $contenido = $('#contenido');
    $contenido.addClass("loaded");
  }, function(error){
    toastr.error('Hubo un error');
  });

  function addQuestion() {
    $scope.quiz.questions.push({
      content: '',
      alternatives: [],
      number_answers: 0
    });
  }

  function addAlternative(question) {
    question.alternatives.push({
      content: '',
      correct_answers: false
    });
  }
}