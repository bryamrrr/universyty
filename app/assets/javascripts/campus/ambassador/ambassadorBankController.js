angular.module("campus-app").controller("AmbassadorBankController", AmbassadorBankController);

AmbassadorBankController.$inject = ['$scope'];

function AmbassadorBankController($scope) {
  console.log("AmbassadorBankController");

  var $contenido = $('#contenido');
  $contenido.addClass("loaded");
}