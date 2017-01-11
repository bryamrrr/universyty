angular.module("campus-app").controller("UserBankController", UserBankController);

UserBankController.$inject = ['$scope'];

function UserBankController($scope) {
  console.log("UserBankController");

  var $contenido = $('#contenido');
  $contenido.addClass("loaded");
}