angular.module("campus-app").controller("AmbassadorFinancialController", AmbassadorFinancialController);

AmbassadorFinancialController.$inject = ['$scope', '$q', 'urls', 'HttpRequest', 'CookieService'];

function AmbassadorFinancialController($scope, $q, urls, HttpRequest, CookieService) {
  var url = urls.BASE_API + '/bonos';
  var promise = HttpRequest.send('GET', url);

  var urlUser = urls.BASE_API + '/users/' + CookieService.read('nickname');
  var promiseUser = HttpRequest.send('GET', urlUser);

  var allPromise = $q.all([promise, promiseUser]);

  allPromise.then(function (response) {
    $scope.movements = response[0];
    $scope.user = response[1];

    console.log("HOLA", response);

    var $contenido = $('#contenido');
    $contenido.addClass("loaded");
  }, function (error) {
    console.log("ERROR: ", error);
  });
}