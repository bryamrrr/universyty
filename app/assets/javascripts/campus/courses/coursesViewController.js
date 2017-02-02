angular.module("campus-app").controller("CoursesViewController", CoursesViewController);

CoursesViewController.$inject = ['$scope', '$stateParams', 'urls', 'HttpRequest'];

function CoursesViewController($scope, $stateParams, urls, HttpRequest) {
  $scope.idCourse = $stateParams.id;
  $scope.currentTab = 0;
  $scope.changeTab = changeTab;
  $scope.isTab = isTab;

  var url = urls.BASE_API + '/courses/' + $scope.idCourse;
  var promise = HttpRequest.send('GET', url);

  promise.then(function (response) {
    $scope.course = response.course;
    $scope.parts = response.parts;

    findTopic();

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

  function changeTab(num) {
    $scope.currentTab = num;
  }

  function isTab(num) {
    return num === $scope.currentTab;
  }
}