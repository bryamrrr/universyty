angular.module("campus-app").controller("AmbassadorPlanController", AmbassadorPlanController);

AmbassadorPlanController.$inject = ['$scope', '$cookies', 'CookieService'];

function AmbassadorPlanController($scope, $cookies, CookieService) {
  var $contenido = $('#contenido');
  $contenido.addClass("loaded");

  $scope.fullname = $cookies.get('fullname');
  $scope.dni = CookieService.read('dni');
  $scope.address = CookieService.read('address');
  $scope.city = CookieService.read('city');

console.log($scope);
  $scope.paymentMethod = '2';
}