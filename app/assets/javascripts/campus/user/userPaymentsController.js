angular.module("campus-app").controller("UserPaymentsController", UserPaymentsController);

UserPaymentsController.$inject = ['$scope', '$q', 'urls', 'HttpRequest', 'CookieService'];

function UserPaymentsController($scope, $q, urls, HttpRequest, CookieService) {
  var url = urls.BASE_API + '/users/' + CookieService.read("nickname");
  var promise = HttpRequest.send("GET", url);

  var urlPayments = urls.BASE_API + '/movements/' + CookieService.read("nickname") + '/payments';
  var promisePayments = HttpRequest.send("GET", urlPayments);

  var allPromises = $q.all([promise, promisePayments]);

  allPromises.then(function (response) {
    $scope.user = response[0];
    $scope.payments = response[1];

    $scope.fullname = angular.copy($scope.user.fullname);

    var $contenido = $('#contenido');
    $contenido.addClass("loaded");
  }, function(error){
    toastr.error("Hubo un error");
  });
}