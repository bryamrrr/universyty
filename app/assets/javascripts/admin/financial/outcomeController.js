angular.module("admin-app").controller("OutcomeController", OutcomeController);

OutcomeController.$inject = ['$scope'];

function OutcomeController($scope) {
  var $contenido = $('#contenido');
  $contenido.addClass("loaded");
}