angular.module("campus-app").controller("AmbassadorBillingController", AmbassadorBillingController);

AmbassadorBillingController.$inject = ['$scope'];

function AmbassadorBillingController($scope) {
  console.log("AmbassadorBillingController");

  var $contenido = $('#contenido');
  $contenido.addClass("loaded");
}