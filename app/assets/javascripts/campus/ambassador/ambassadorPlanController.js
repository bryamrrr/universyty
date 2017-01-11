angular.module("campus-app").controller("AmbassadorPlanController", AmbassadorPlanController);

AmbassadorPlanController.$inject = ['$scope'];

function AmbassadorPlanController($scope) {
  console.log("AmbassadorPlanController");

  var $contenido = $('#contenido');
  $contenido.addClass("loaded");
}