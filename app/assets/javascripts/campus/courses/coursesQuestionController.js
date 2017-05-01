angular.module("campus-app").controller("CoursesQuestionController", CoursesQuestionController);

CoursesQuestionController.$inject = ['$scope', '$stateParams', '$state', '$cookies', '$uibModal', '$rootScope', 'urls', 'CookieService', 'HttpRequest', 'toastr'];

function CoursesQuestionController($scope, $stateParams, $state, $cookies, $uibModal, $rootScope, urls, CookieService, HttpRequest, toastr) {
  $scope.select = select;
  $scope.isSelected = isSelected;
  $scope.alphabet = ['A', 'B', 'C', 'D', 'E'];
  $scope.next = next;
  $scope.finish = finish;
  $scope.$parent.showCheck = false;

  var questionId = $stateParams.question;
  var url = urls.BASE_API + '/questions/' + questionId;
  var promise = HttpRequest.send('GET', url);

  promise.then(function (response) {
    $scope.question = response.question;
    $scope.next_question = response.next_question;
    $scope.next_exam = response.next_exam;
    var $contenido = $('#contenido');
    $contenido.addClass("loaded");
  }, function (error) {
    console.log(error);
  });

  function select(alternative) {
    if (!$scope.$parent.showCheck) $scope.alternativeSelected = alternative;
  }

  function isSelected(alternative) {
    return alternative === $scope.alternativeSelected;
  }

  function next(question) {
    $state.go('courses.question', { id: $stateParams.id, part: question.part_id, question: $scope.next_question.id })
  }

  function finish(question) {
    $scope.isLoading = true;
    var url = urls.BASE_API + '/enrollments/update_grade_course/' + $stateParams.id;

    var quiz = JSON.parse($cookies.get('quiz'));
    var examn = "";
    var grade = 0;
    var i = 0;

    for (var property in quiz) {
      grade += quiz[property];
    }

    if ($scope.next_exam === 'Aplazado') {
      exam = 'Sustitutorio';
    } else if ($scope.next_exam === 'No hay') {
      exam = 'Aplazado';
    } else {
      exam = 'Examen';
      $scope.next_exam = 'Sustitutorio';
    }

    var data = {
      grade: grade,
      exam: exam,
      part: question.part_id
    }

    var promise = HttpRequest.send('POST', url, data);
    promise.then(function (response) {
      $scope.isLoading = false;

      openDetails(response, $scope.next_exam);
    }, function (error) {
      console.log(error);
      $scope.isLoading = false;
    });

  }

  function openDetails(data, next_exam, size, parentSelector) {
    var parentElem = parentSelector ? angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
    $uibModal.open({
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'campus/quiz/results.html',
      controller: ['$scope', function($scope) {
        $scope.data = data;
        $scope.repeatCourse = repeatCourse;
        $scope.goToSusti = goToSusti;
        $scope.next_exam = next_exam;
        $scope.nextPart = nextPart;
      }],
      size: size,
      appendTo: parentElem
    });
  };

  function repeatCourse() {
    var url = urls.BASE_API + '/enrollments/repeat_course/' + $stateParams.id;
    var promise = HttpRequest.send('GET', url);

    promise.then(function (response) {
      $('.modal').remove();
      $state.go('courses.view', { id: $stateParams.id, part: $stateParams.part , topic: 1 });
      CookieService.remove('quiz');
    }, function (error) {
      console.log("ERROR: ", error);
    });
  }

  function goToSusti() {
    $scope.isLoading = true;
    var url = urls.BASE_API + '/parts/' + $stateParams.part;
    var promise = HttpRequest.send('GET', url);

    promise.then(function (response) {
      $('.modal').remove();
      $state.go('courses.quiz', { id: $stateParams.id, part: $stateParams.part, number: response.number });
      CookieService.remove('quiz');
      $scope.isLoading = false;
    }, function (error) {
      console.log(error);
      $scope.isLoading = false;
    });
  }

  function nextPart() {
    $scope.isLoading = true;

    var url = urls.BASE_API + '/enrollments/next_module/' + $stateParams.id;
    var promise = HttpRequest.send('GET', url);

    promise.then(function (response) {
      $('.modal').remove();
      $state.go('courses.view', { id: $stateParams.id, part: response.part_number, topic: response.topic_number });
      CookieService.remove('quiz');
      $scope.isLoading = false;
    }, function (error) {
      $scope.isLoading = false;
    });
  }
}