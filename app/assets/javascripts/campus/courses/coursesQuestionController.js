angular.module("campus-app").controller("CoursesQuestionController", CoursesQuestionController);

CoursesQuestionController.$inject = ['$scope', '$stateParams', '$state', '$cookies', '$uibModal', '$rootScope', 'urls', 'CookieService', 'HttpRequest', 'toastr'];

function CoursesQuestionController($scope, $stateParams, $state, $cookies, $uibModal, $rootScope, urls, CookieService, HttpRequest, toastr) {
  $scope.select = select;
  $scope.isSelected = isSelected;
  $scope.alphabet = ['A', 'B', 'C', 'D', 'E'];
  $scope.showCheck = false;
  $scope.next = next;
  $scope.finish = finish;

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

  function finish(question) {
    $scope.isLoading = true;
    var url = urls.BASE_API + '/enrollments/update_grade_course/' + $stateParams.id;

    var quiz = JSON.parse($cookies.get('quiz'));
    var grade = 0;
    var i = 0;

    for (var property in quiz) {
      grade += quiz[property];
    }

    var data = {
      grade: grade,
      type: 'Examen',
      part: question.part_id
    }

    var promise = HttpRequest.send('POST', url, data);
    promise.then(function (response) {
      console.log("Respuesta luego de guardar la nota en el back", response);
      $scope.isLoading = false;

      openDetails(response);
    }, function (error) {
      console.log(error);
      $scope.isLoading = false;
    });

  }

  function openDetails(data, size, parentSelector) {
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
      }],
      size: size,
      appendTo: parentElem
    });
  };

  function repeatCourse() {
    $('.modal').remove();
    $state.go('courses.view', { id: $stateParams.id, topic: 0 });
    CookieService.remove('quiz');
  }

  function goToSusti() {
    $scope.isLoading = true;
    var url = urls.BASE_API + '/parts/' + $stateParams.part;
    var promise = HttpRequest.send('GET', url);

    promise.then(function (response) {
      $('.modal').remove();
      $state.go('courses.quiz', { id: $stateParams.id, part: $stateParams.part, number: response.number });
      $scope.isLoading = false;
    }, function (error) {
      console.log(error);
      $scope.isLoading = false;
    });
  }

  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, options){
      CookieService.remove('quiz');

  })
}