angular.module("campus-app").controller("CourseInfoController", CourseInfoController);

CourseInfoController.$inject = ['$scope', '$stateParams', 'urls', 'CookieService', 'HttpRequest', 'toastr'];

function CourseInfoController($scope, $stateParams, urls, CookieService, HttpRequest, toastr) {
  $scope.addToCart = addToCart;

  var url = urls.BASE_API + '/courses/' + $stateParams.id;
  var promise = HttpRequest.send("GET", url);

  promise.then(function (response) {
    $scope.course = response.course;
    $scope.parts = response.parts;
    $scope.videoUrl = 'https://www.youtube.com/embed/' + response.course.video_url;

    getProfessors();
    var $contenido = $('#contenido');
    $contenido.addClass("loaded");
  }, function(error){
    toastr.error("Hubo un error");
  });

  function addToCart(course) {
    if (course.free) {
      var url = urls.BASE_API + '/enrollments/free/' + course.id;
      var promise = HttpRequest.send("GET", url);

      promise.then(function (response) {
        if (response.errors) {
          toastr.error(response.errors);
        } else {
          toastr.success(response.message);
        }

        var $contenido = $('#contenido');
        $contenido.addClass("loaded");
      }, function(error) {
        toastr.error("Hubo un error");
      });
    } else {
      var item = {
        id: course.id,
        title: course.title,
        pricetag: course.pricetag
      };

      $scope.$parent.cart.addItem(item);
    }
  }

  function getProfessors() {
    var i = 0;
    for (i; i < $scope.course.professors.length; i++) {
      if (i === 0) {
        $scope.professorsText = $scope.course.professors[i].name;
      } else {
        $scope.professorsText += ', ' + $scope.course.professors[i].name;
      }
    }
  }
}