angular.module("campus-app").controller("CoursesCreatedController", CoursesCreatedController);

CoursesCreatedController.$inject = ['$scope', 'urls', 'CookieService', 'HttpRequest'];

function CoursesCreatedController($scope, urls, CookieService, HttpRequest) {
  var url = urls.BASE_API + '/users/' + CookieService.read('nickname') + '/courses';
  var promise = HttpRequest.send("GET", url);

  promise.then(function (response) {
    $scope.courses = response;
    console.log(response);
    var $contenido = $('#contenido');
    $contenido.addClass("loaded");
  }, function(error){
    toastr.error("Hubo un error");
  });
}