angular.module('campus-app').controller('DashboardController', DashboardController)

DashboardController.$inject = ['$scope', '$state', 'CookieService', 'urls', 'HttpRequest', 'toastr'];
function DashboardController($scope, $state,  CookieService, urls, HttpRequest, toastr) {
  $scope.nickname = CookieService.read('nickname');
  $scope.role = CookieService.read('role');
  $scope.first_entry = CookieService.read('first_entry');

  $scope.goAmbassador = goAmbassador;

  if ($scope.first_entry === 'false') {
    $scope.modalOpened = true;
  }

  function goAmbassador() {
    $scope.modalOpened = false;
    $state.go('ambassador.plan');
    CookieService.put('first_entry', 'true');
  }

  var url = urls.BASE_API + '/categories';
  var promise = HttpRequest.send('GET', url);

  promise.then(function (response) {
    $scope.categories = response;
  }, function (error) {
    toastr.error(error.message);
  });
}