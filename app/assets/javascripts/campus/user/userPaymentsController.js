angular.module("campus-app").controller("UserPaymentsController", UserPaymentsController);

UserPaymentsController.$inject = ['$scope', '$state', '$q', '$uibModal', '$document', 'urls', 'HttpRequest', 'CookieService', 'SweetAlert'];

function UserPaymentsController($scope, $state, $q, $uibModal, $document, urls, HttpRequest, CookieService, SweetAlert) {
  $scope.openDetails = openDetails;
  $scope.paymentDelete = paymentDelete;

  var url = urls.BASE_API + '/users/' + CookieService.read("nickname");
  var promise = HttpRequest.send("GET", url);

  var urlPayments = urls.BASE_API + '/movements/' + CookieService.read("nickname") + '/payments';
  var promisePayments = HttpRequest.send("GET", urlPayments);

  var allPromises = $q.all([promise, promisePayments]);

  allPromises.then(function (response) {
    $scope.user = response[0];
    $scope.payments = response[1];
    console.log(response[1]);

    $scope.fullname = angular.copy($scope.user.fullname);

    var $contenido = $('#contenido');
    $contenido.addClass("loaded");
  }, function(error){
    toastr.error("Hubo un error");
  });

  function openDetails(payment, size, parentSelector) {
    $scope.cart = payment;
    var parentElem = parentSelector ? angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
    $uibModal.open({
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'campus/user/payment-details.html',
      controller: ['$scope', function($scope) {
        $scope.cart = payment;
        console.log(payment)
      }],
      size: size,
      appendTo: parentElem
    });
  };

  function paymentDelete(id, $event){
    SweetAlert.swal({
      title: "Estás seguro?",
      text: "Esta acción es irreversible!",
      type: "warning",
      showCancelButton: true,
      cancelButtonClass: "button-ln",
      confirmButtonClass: "button-bg primary",
      confirmButtonText: "Si, eliminarlo!",
      cancelButtonText: "No, cancelar!",
      closeOnConfirm: false,
      closeOnCancel: false
    }, function(isConfirm){
      if (isConfirm) {
        var url = urls.BASE_API + '/movements/' + id;
        var promise = HttpRequest.send("DELETE", url);
        promise.then(function(response) {
          SweetAlert.swal("Eliminado!", "Se eliminó correctamente", "success");
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