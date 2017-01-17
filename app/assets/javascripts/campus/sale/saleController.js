angular.module("campus-app").controller("SaleController", SaleController);

SaleController.$inject = ['$scope', 'CookieService'];

function SaleController($scope, CookieService) {
  var $contenido = $('#contenido');
  $contenido.addClass("loaded");

  console.log("SALECONTROLLER");
}