angular.module("campus-app").controller("CoursesListController", CoursesListController);

CoursesListController.$inject = ['$scope'];

function CoursesListController($scope) {
  console.log("CoursesListController");

  var $contenido = $('#contenido');
  $contenido.addClass("loaded");
}