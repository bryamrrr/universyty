angular.module("admin-app").controller("PendingController", PendingController);

PendingController.$inject = ['$scope', '$state', 'urls', 'HttpRequest', '$uibModal', 'SweetAlert'];

function PendingController($scope, $state, urls, HttpRequest, $uibModal, SweetAlert) {
  $scope.openDetails = openDetails;
  $scope.activate = activate;

  var url = urls.BASE_API + '/movements/pendings';
  var promise = HttpRequest.send('GET', url);

  promise.then(function (response) {
    $scope.payments = response;
    console.log(response);

    var $contenido = $('#contenido');
    $contenido.addClass("loaded");
  }, function (error) {
    console.log(error);
  });

  function openDetails(payment, size, parentSelector) {
    $scope.cart = payment;
    var parentElem = parentSelector ? angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
    $uibModal.open({
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'admin/financial/pending-details.html',
      controller: ['$scope', function($scope) {
        $scope.cart = payment;
      }],
      size: size,
      appendTo: parentElem
    });
  };

  function activate(id) {
    SweetAlert.swal({
      title: "Estás seguro?",
      text: "Esta acción cambiará el estado del movimiento a 'Pagado'!",
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
        var url = urls.BASE_API + '/movements/' + id + '/change_activate';
        var promise = HttpRequest.send("GET", url);
        promise.then(function(response) {
          SweetAlert.swal("Actualizado!", "Se cambió el estado correctamente", "success");
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