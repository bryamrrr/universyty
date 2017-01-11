angular.module("campus-app").controller("CoursesGradesController", CoursesGradesController);

CoursesGradesController.$inject = ['$scope'];

function CoursesGradesController($scope) {
  console.log("CoursesGradesController");

  var $contenido = $('#contenido');
  $contenido.addClass("loaded");
}