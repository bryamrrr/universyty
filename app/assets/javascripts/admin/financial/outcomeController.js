angular.module("admin-app").controller("OutcomeController", OutcomeController);

OutcomeController.$inject = ['$scope', '$state', 'urls', 'HttpRequest', '$uibModal', 'SweetAlert'];

function OutcomeController($scope, $state, urls, HttpRequest, $uibModal, SweetAlert) {
  var url = urls.BASE_API + '/movements/outcomes';
  var promise = HttpRequest.send('GET', url);

  promise.then(function (response) {
    $scope.outcomes = response;
    console.log(response);

    var $contenido = $('#contenido');
    $contenido.addClass("loaded");
  }, function (error) {
    console.log(error);
  });
}