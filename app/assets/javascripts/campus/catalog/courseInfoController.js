angular.module("campus-app").controller("CourseInfoController", CourseInfoController);

CourseInfoController.$inject = ['$scope', '$stateParams', 'urls', 'CookieService', 'HttpRequest'];

function CourseInfoController($scope, $stateParams, urls, CookieService, HttpRequest) {
  var url = urls.BASE_API + '/courses/' + $stateParams.id;
  var promise = HttpRequest.send("GET", url);

  promise.then(function (response) {
    $scope.course = response.course;
    $scope.parts = response.parts;
    var $contenido = $('#contenido');
    $contenido.addClass("loaded");
  }, function(error){
    toastr.error("Hubo un error");
  });
}