angular.module("admin-app").controller("OutcomeController", OutcomeController);

OutcomeController.$inject = ['$scope', '$state', 'urls', 'HttpRequest', '$uibModal', 'SweetAlert'];

function OutcomeController($scope, $state, urls, HttpRequest, $uibModal, SweetAlert) {
  $scope.finish = finish;
  $scope.cancel = cancel;

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

  function finish(outcome) {
    SweetAlert.swal({
      title: "Estás seguro?",
      text: "Se cambiará el estado a pagado. Esta acción es irreversible!",
      type: "warning",
      showCancelButton: true,
      cancelButtonClass: "button-ln",
      confirmButtonClass: "button-bg primary",
      confirmButtonText: "Si, cambiarlo!",
      cancelButtonText: "No, cancelar!",
      closeOnConfirm: false,
      closeOnCancel: false
    }, function(isConfirm){
      if (isConfirm) {
        var url = urls.BASE_API + '/movements/' + outcome.id + '/finish_retire';
        var promise = HttpRequest.send("GET", url);
        promise.then(function(response) {
          SweetAlert.swal("Actualizado!", "Se cambió el estado a pagado", "success");
          $state.reload();
        }, function(error) {
          toastr.error("Hubo un error");
        });
      } else {
        SweetAlert.swal("Cancelado", "Se canceló la acción", "error");
      }
    });
  }

  function cancel(outcome) {
    SweetAlert.swal({
      title: "Estás seguro?",
      text: "Se cancelará el pedido del usuario. Esta acción es irreversible!",
      type: "warning",
      showCancelButton: true,
      cancelButtonClass: "button-ln",
      confirmButtonClass: "button-bg primary",
      confirmButtonText: "Si, cancelar!",
      cancelButtonText: "No, déjalo así!",
      closeOnConfirm: false,
      closeOnCancel: false
    }, function(isConfirm){
      if (isConfirm) {
        var url = urls.BASE_API + '/movements/' + outcome.id + '/cancel_retire';
        var promise = HttpRequest.send("GET", url);
        promise.then(function(response) {
          SweetAlert.swal("Actualizado!", "Se canceló el pedido", "success");
          $state.reload();
        }, function(error) {
          toastr.error("Hubo un error");
        });
      } else {
        SweetAlert.swal("Cancelado", "Se canceló la acción", "error");
      }
    });
  }
}