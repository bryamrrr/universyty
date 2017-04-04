angular.module("admin-app").controller("ContingencyController", ContingencyController);

ContingencyController.$inject = ['$scope', '$state', 'urls', 'HttpRequest', 'toastr'];

function ContingencyController($scope, $state, urls, HttpRequest, toastr) {
  $scope.tabSelected = 0;
  $scope.goInject = goInject;
  $scope.goExtract = goExtract;

  var url = urls.BASE_API + '/bonos/contingency';
  var promise = HttpRequest.send('GET', url);

  promise.then(function (response) {
    console.log(response);
    $scope.injects = response.injects;
    $scope.extracts = response.extracts;

    var $contenido = $('#contenido');
    $contenido.addClass("loaded");
  }, function (error) {
    console.error(error);
  });

  function goInject(form, inject) {
    $scope.injectLoading = true;
    var url = urls.BASE_API + '/bonos/contingency';
    var data = {
      type: "Inyección",
      user: inject.user,
      amount: inject.amount
    };
    var promise = HttpRequest.send('POST', url, data);

    promise.then(function (response) {
      toastr.success('Inyección de saldo realizada con éxito');
      $scope.injectLoading = false;
      $state.reload();

      var $contenido = $('#contenido');
      $contenido.addClass("loaded");
    }, function (error) {
      $scope.injectLoading = false;
      console.error(error);
    });
  }

  function goExtract(form, extract) {
    $scope.extractLoading = true;
    var url = urls.BASE_API + '/bonos/contingency';
    var data = {
      type: "Extracción",
      user: extract.user,
      amount: extract.amount
    };
    var promise = HttpRequest.send('POST', url, data);

    promise.then(function (response) {
      toastr.success('Extracción de saldo realizada con éxito');
      $scope.extractLoading = false;
      $state.reload();

      var $contenido = $('#contenido');
      $contenido.addClass("loaded");
    }, function (error) {
      $scope.extractLoading = false;
      console.error(error);
    });
  }
}