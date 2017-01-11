angular.module("campus-app").controller("UserPaymentsController", UserPaymentsController);

UserPaymentsController.$inject = ['$scope'];

function UserPaymentsController($scope) {
  console.log("UserPaymentsController");

  var $contenido = $('#contenido');
  $contenido.addClass("loaded");
}