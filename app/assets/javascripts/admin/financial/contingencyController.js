angular.module("admin-app").controller("ContingencyController", ContingencyController);

ContingencyController.$inject = ['$scope', '$state', 'urls', 'HttpRequest', 'toastr', 'SweetAlert'];

function ContingencyController($scope, $state, urls, HttpRequest, toastr, SweetAlert) {
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
    SweetAlert.swal({
      title: "Estás seguro?",
      text: "De realizar esta inyección de saldo?",
      type: "warning",
      showCancelButton: true,
      cancelButtonClass: "button-ln",
      confirmButtonClass: "button-bg primary",
      confirmButtonText: "Si",
      cancelButtonText: "No",
      closeOnConfirm: false,
      closeOnCancel: false
    }, function(isConfirm){
      if (isConfirm) {
        $scope.injectLoading = true;
        var url = urls.BASE_API + '/bonos/contingency';
        var data = {
          type: "Inyección",
          user: inject.user,
          amount: inject.amount
        };
        var promise = HttpRequest.send('POST', url, data);

        promise.then(function (response) {
          if (response.errors) {
            toastr.error(response.errors);
          } else {
            SweetAlert.swal("Actualizado!", "Inyección de saldo realizada con éxito", "success");
            $state.reload();
          }
          $scope.injectLoading = false;
        }, function (error) {
          $scope.injectLoading = false;
          console.error(error);
        });
      } else {
        SweetAlert.swal("Cancelado", "Se canceló la acción", "error");
      }
    });
  }

  function goExtract(form, extract) {
    SweetAlert.swal({
      title: "Estás seguro?",
      text: "De realizar esta extracción de saldo?",
      type: "warning",
      showCancelButton: true,
      cancelButtonClass: "button-ln",
      confirmButtonClass: "button-bg primary",
      confirmButtonText: "Si",
      cancelButtonText: "No",
      closeOnConfirm: false,
      closeOnCancel: false
    }, function(isConfirm){
      if (isConfirm) {
        $scope.extractLoading = true;
        var url = urls.BASE_API + '/bonos/contingency';
        var data = {
          type: "Extracción",
          user: extract.user,
          amount: extract.amount
        };
        var promise = HttpRequest.send('POST', url, data);

        promise.then(function (response) {
          if (response.errors) {
            toastr.error(response.errors);
          } else {
            SweetAlert.swal("Actualizado!", "Extracción de saldo realizada con éxito", "success");
            $state.reload();
          }
          $scope.extractLoading = false;
        }, function (error) {
          $scope.extractLoading = false;
          console.error(error);
        });
      } else {
        SweetAlert.swal("Cancelado", "Se canceló la acción", "error");
      }
    });
  }
}