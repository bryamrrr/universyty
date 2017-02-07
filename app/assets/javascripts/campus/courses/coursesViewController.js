angular.module("campus-app").controller("CoursesViewController", CoursesViewController);

CoursesViewController.$inject = ['$scope', '$q', '$state', '$stateParams', 'urls', 'HttpRequest', 'CookieService'];

function CoursesViewController($scope, $q, $state, $stateParams, urls, HttpRequest, CookieService) {
  $scope.idCourse = $stateParams.id;
  $scope.currentTab = 0;
  $scope.changeTab = changeTab;
  $scope.isTab = isTab;
  $scope.goTo = goTo;
  var currentVideo, currentModule;

  var url = urls.BASE_API + '/courses/' + $scope.idCourse;
  var promise = HttpRequest.send('GET', url);

  var urlEnrollment = urls.BASE_API + '/enrollments/courses/' + $scope.idCourse;
  var promiseEnrollment = HttpRequest.send('GET', urlEnrollment);

  var allPromise = $q.all([promise, promiseEnrollment]);

  allPromise.then(function (response) {
    $scope.course = response[0].course;
    $scope.parts = response[0].parts;
    $scope.enrollment = response[1].enrollment;
    currentVideo = response[1].video;
    currentModule = response[1].part;

    findTopic();
    sendUpdate();

    var $contenido = $('#contenido');
    $contenido.addClass("loaded");
  }, function (error) {
    console.log(error);
  })

  function findTopic() {
    var i = 0;
    var j = 0;
    var topics = $scope.parts[0].topics;
    if ($stateParams.topic === '0') {
      for (i; i < topics.length; i++) {
        if (topics[i].number === 1) {
          $scope.currentTopic = topics[i];
          $scope.wistiaVideo = 'http://fast.wistia.com/embed/medias/' + $scope.currentTopic.video_url;
        }
      }
    } else {
      for (i; i < $scope.parts.length; i++) {
        j = 0;
        for (j; j < $scope.parts[i].topics.length; j++) {
          if ($scope.parts[i].topics[j].id === parseInt($stateParams.topic)) {
            $scope.currentTopic = $scope.parts[i].topics[j];
            $scope.wistiaVideo = 'http://fast.wistia.com/embed/medias/' + $scope.currentTopic.video_url;
          }
        }
      }
    }
  }

  function sendUpdate() {
    var url = urls.BASE_API + '/enrollments/' + $scope.enrollment.id;
    var data = {
      topic_id: $scope.currentTopic.id,
      part_id: $scope.currentTopic.part_id
    };
    var promise = HttpRequest.send('PUT', url, data);

    promise.then(function (response) {
      $scope.enrollment = response.enrollment;
      currentVideo = response.video;
      currentModule = response.part;
      Enabletopics();
    }, function (error) {
      console.log(error);
    });
  }

  function Enabletopics() {
    console.log(currentModule);
    var numModule = currentModule.number;
    var numVideo = currentVideo.number;
    var i = 0, j = 0, k = 0;

    if (numModule > 1) {
      for (i; i <= numModule-1; i++) {
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
    } else {
      $scope.parts[0].topics[0].enabled = true;
    }

    if ($scope.parts[numModule-1].topics[numVideo]) {
      $scope.parts[numModule-1].topics[numVideo].enabled = true;
    } else {
      $scope.parts[numModule-1].enabled = true;
    }
  }

  function changeTab(num) {
    $scope.currentTab = num;
  }

  function isTab(num) {
    return num === $scope.currentTab;
  }

  function goTo(thing, params) {
    if (thing === 'video' && params.topic.enabled) {
      $state.go('courses.view', { id: params.id, topic: params.topic.id });
    } else if (thing === 'quiz' && params.part.enabled) {
      $state.go('courses.quiz', { id: params.id, part: params.part.id, number: params.number });
    }
  }
}