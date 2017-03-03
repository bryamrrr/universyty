angular.module("campus-app").controller("WelcomeHomeController", WelcomeHomeController);

WelcomeHomeController.$inject = ['$scope', '$q', 'urls', 'CookieService', 'HttpRequest'];

function WelcomeHomeController($scope, $q, urls, CookieService, HttpRequest) {
  var url = urls.BASE_API + '/courses_starred';
  var promise = HttpRequest.send("GET", url);

  var urlInfo = urls.BASE_API + '/informations/show_welcome_image';
  var promiseInfo = HttpRequest.send('GET', urlInfo);

  var allPromise = $q.all([promise, promiseInfo]);

  allPromise.then(function (response) {
    console.log(response);
    $scope.courses = response[0];
    $scope.$parent.info = response[1].image;
    if (response[1].image.link_url) $scope.$parent.link_url = response[1].image.link_url;

    var $contenido = $('#contenido');
    $contenido.addClass("loaded");
  }, function(error){
    toastr.error("Hubo un error");
  });
}