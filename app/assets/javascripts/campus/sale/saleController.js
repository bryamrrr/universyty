angular.module("campus-app").controller("SaleController", SaleController);

SaleController.$inject = ['$scope', '$cookies', '$state', 'CookieService'];

function SaleController($scope, $cookies, $state, CookieService) {
  var $contenido = $('#contenido');
  $contenido.addClass("loaded");

  $scope.fullname = $cookies.get('fullname');
  $scope.dni = CookieService.read('dni');
  $scope.address = CookieService.read('address');
  $scope.city = CookieService.read('city');

  var cart = $cookies.get('cart');
  if (cart) $scope.cart = JSON.parse(cart);

  $scope.paymentMethod = '2';
}