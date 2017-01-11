angular.module("campus-app").controller("AmbassadorFinancialController", AmbassadorFinancialController);

AmbassadorFinancialController.$inject = ['$scope'];

function AmbassadorFinancialController($scope) {
  console.log("AmbassadorFinancialController");

  var $contenido = $('#contenido');
  $contenido.addClass("loaded");
}