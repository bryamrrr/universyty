angular.module("campus-app").controller("CoursesViewController", CoursesViewController);

CoursesViewController.$inject = ['$scope', '$location', '$q', '$state', '$stateParams', 'urls', 'HttpRequest', 'CookieService', 'SweetAlert', 'ngAudio'];

function CoursesViewController($scope, $location, $q, $state, $stateParams, urls, HttpRequest, CookieService, SweetAlert, ngAudio) {
  $scope.requestCertificate = requestCertificate;
  $scope.clickPlayOrPause = clickPlayOrPause;
  $scope.idCourse = $stateParams.id;
  $scope.changeTab = changeTab;
  $scope.isTab = isTab;
  $scope.goTo = goTo;
  $scope.filteredGrades = [[]];
  $scope.totals = [0];
  $scope.interactiveStep = 0;
  var currentVideo, currentModule;
  var playingAudio = false;
  var amountForSlider = 100000;

  $scope.slider = {
    value: 0,
    options: {
      showSelectionBar: true,
      ceil: amountForSlider,
      onChange: onSliderChange,
    }
  };

  if ($location.$$search.notas) {
    $scope.currentTab = 1;
  } else {
    $scope.currentTab = 0;
  }

  var url = urls.BASE_API + '/courses/' + $scope.idCourse;
  var promise = HttpRequest.send('GET', url);

  var urlEnrollment = urls.BASE_API + '/enrollments/courses/' + $scope.idCourse + '/' + $stateParams.part + '/' + $stateParams.topic;
  var promiseEnrollment = HttpRequest.send('GET', urlEnrollment);

  var allPromise = $q.all([promise, promiseEnrollment]);

  allPromise.then(function (response) {
    $scope.course = response[0].course;
    $scope.parts = response[0].parts;
    $scope.enrollment = response[1].enrollment;
    $scope.grades = response[1].grades;
    $scope.view_exam = response[1].view_exam;
    currentVideo = response[1].video;
    currentModule = response[1].part;
    $scope.auditions = response[1].auditions;

    $scope.auditionAudio = ngAudio.load($scope.auditions[0].audio);
    console.log('$scope.auditionAudio', $scope.auditionAudio);
    // $scope.slider = {
    //   value: $scope.auditionAudio.progress,
    //   options: {
    //       showSelectionBar: true
    //   }
    // };

    $scope.currentTopic = currentVideo;
    $scope.vimeoVideo = 'https://player.vimeo.com/video/' + $scope.currentTopic.video_url;

    enabletopics();
    filterGrades();

    var $contenido = $('#contenido');
    $contenido.addClass("loaded");
  }, function (error) {
    console.log(error);
  })

  function clickPlayOrPause() {
    if ($scope.auditionAudio.paused) {
      $scope.auditionAudio.play();
      playingAudio = setInterval(() => {
        $scope.slider.value = $scope.auditionAudio.progress * amountForSlider;
      }, 1000);
    } else {
      $scope.auditionAudio.pause();
      clearInterval(playingAudio);
    }
  }

  function onSliderChange(sliderId, modelValue, highValue, pointerType) {
    console.log('sliderId, modelValue, highValue, pointerType', sliderId, modelValue, highValue, pointerType);
    $scope.auditionAudio.progress = modelValue / amountForSlider;
  }

  function enabletopics() {
    var numModule = $scope.enrollment.current_module;
    var numVideo = $scope.enrollment.current_video;
    var i = 0, j = 0, k = 0;

    if (numModule > 1) {
      for (i; i <= numModule-1; i++) {
        j = 0;
        if (i === numModule-1) {
          if (numVideo > 1) {
            for (j; j < numVideo; j++) {
              $scope.parts[i].topics[j].enabled = true;
            }
          } else {
            $scope.parts[i].topics[0].enabled = true;
          }
        } else {
          for (j; j < $scope.parts[i].topics.length; j++) {
            $scope.parts[i].topics[j].enabled = true;
          }
        }
      }
    } else if (numModule === 1) {
      for (j; j <= numVideo-1; j++) {
        $scope.parts[0].topics[j].enabled = true;
      }
    }

    if ($scope.view_exam) $scope.parts[numModule-1].enabled = true;
  }

  function filterGrades() {
    var counterTimes = 0;
    var counter = 0;
    var sum = 0;
    for (var i = 0; i < $scope.grades.length; i++) {
      $scope.filteredGrades[counter].push($scope.grades[i].score);
      counterTimes++;

      if ($scope.grades[i].score >= 14) {
        $scope.totals[counter] = $scope.grades[i].score;
        $scope.filteredGrades.push([]);
        counter++;
        counterTimes = 0;
        if (i + 1 !== $scope.grades.length) $scope.totals.push(0);
      }
    }

    for (var j = 0; j < $scope.totals.length; j++) {
      sum += $scope.totals[j];
    }

    $scope.grade_total = Math.round(sum / $scope.totals.length);

  }

  function changeTab(num) {
    $scope.currentTab = num;
  }

  function isTab(num) {
    return num === $scope.currentTab;
  }

  function goTo(thing, params) {
    if (thing === 'video' && params.topic.enabled) {
      $state.go('courses.view', { id: params.id, part: params.part.number, topic: params.topic.number });
    } else if (thing === 'quiz' && params.part.enabled) {
      $state.go('courses.quiz', { id: params.id, part: params.part.id, number: params.number });
    }
  }

  function requestCertificate() {
    if ($scope.grade_total >= 14) {
      SweetAlert.swal({
        title: "Deseas obtener tu certificado?",
        text: "La URL de tu certificado estara disponible en la sección CERTIFICADO",
        type: "warning",
        showCancelButton: true,
        cancelButtonClass: "button-ln",
        confirmButtonClass: "button-bg primary",
        confirmButtonText: "Si",
        cancelButtonText: "No",
        closeOnConfirm: false,
        closeOnCancel: false
      }, function(isConfirm){
        if (isConfirm) {
          var url = urls.BASE_API + '/enrollments/' + $scope.enrollment.id + '/request_certificate';
          var promise = HttpRequest.send("GET", url);
          promise.then(function(response) {
            SweetAlert.swal("Listo!", "Hemos recibido tu solicitud; por favor, espéranos un máximo de 72 horas. ¡Gracias!", "success");
          }, function(error) {
            toastr.error("Hubo un error");
          });
        } else {
          SweetAlert.swal("Cancelado", "Se canceló la solicitud", "error");
        }
      });
    }
  }
}