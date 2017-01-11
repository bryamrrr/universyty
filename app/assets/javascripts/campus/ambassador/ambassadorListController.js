angular.module("campus-app").controller("AmbassadorListController", AmbassadorListController);

AmbassadorListController.$inject = ['$scope'];

function AmbassadorListController($scope) {
  console.log("AmbassadorListController");

  var $contenido = $('#contenido');
  $contenido.addClass("loaded");
}