angular.module("admin-app").controller("ContingencyController", ContingencyController);

ContingencyController.$inject = ['$scope'];

function ContingencyController($scope) {
  var $contenido = $('#contenido');
  $contenido.addClass("loaded");
}