angular.module("campus-app").controller("CourseInfoController", CourseInfoController);

CourseInfoController.$inject = ['$scope', '$stateParams', 'urls', 'CookieService', 'HttpRequest'];

function CourseInfoController($scope, $stateParams, urls, CookieService, HttpRequest) {
  $scope.addToCart = addToCart;

  var url = urls.BASE_API + '/courses/' + $stateParams.id;
  var promise = HttpRequest.send("GET", url);

  promise.then(function (response) {
    $scope.course = response.course;
    $scope.parts = response.parts;

    getProfessors();
    var $contenido = $('#contenido');
    $contenido.addClass("loaded");
  }, function(error){
    toastr.error("Hubo un error");
  });

  function addToCart(course) {
    var item = {
      id: course.id,
      title: course.title,
      pricetag: course.pricetag
    };

    $scope.$parent.cart.addItem(item);
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