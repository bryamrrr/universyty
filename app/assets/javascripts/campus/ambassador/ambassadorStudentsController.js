angular.module("campus-app").controller("AmbassadorStudentsController", AmbassadorStudentsController);

AmbassadorStudentsController.$inject = ['$scope'];

function AmbassadorStudentsController($scope) {
  console.log("AmbassadorStudentsController");

  var $contenido = $('#contenido');
  $contenido.addClass("loaded");
}