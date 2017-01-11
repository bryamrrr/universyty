angular.module("admin-app").controller("WelcomeHomeController", WelcomeHomeController);

WelcomeHomeController.$inject = ['$scope'];

function WelcomeHomeController($scope) {
  var $contenido = $('#contenido');
  $contenido.addClass("loaded");
}