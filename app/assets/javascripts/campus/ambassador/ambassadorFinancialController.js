angular.module("campus-app").controller("AmbassadorFinancialController", AmbassadorFinancialController);

AmbassadorFinancialController.$inject = ['$scope', '$q', 'urls', 'HttpRequest', 'CookieService', 'toastr'];

function AmbassadorFinancialController($scope, $q, urls, HttpRequest, CookieService, toastr) {
  $('.modal-overlay').show();
  $scope.sendPassword = sendPassword;

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

  function sendPassword(password) {
    $scope.isLoading = true;
    var nickname = CookieService.read('nickname');

    var url = urls.BASE_API + '/users/confirm_password';
    var data = {
      nickname: nickname,
      password: password
    };

    var promise = HttpRequest.send('POST', url, data);

    promise.then(function (response) {
      if (response.errors) {
        toastr.error(response.errors);
      } else {
        toastr.success(response.message);
        $scope.hidePassword = true;
        $('.modal-overlay').hide();
      }
    }, function (error) {
      console.error(error);
    });
  }
}