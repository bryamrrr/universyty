angular.module("campus-app").controller("AmbassadorPreferencialController", AmbassadorPreferencialController);

AmbassadorPreferencialController.$inject = ['$scope'];

function AmbassadorPreferencialController($scope) {
  console.log("AmbassadorPreferencialController");

  var $contenido = $('#contenido');
  $contenido.addClass("loaded");
}