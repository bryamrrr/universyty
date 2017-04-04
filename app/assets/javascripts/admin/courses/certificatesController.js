angular.module("admin-app").controller("CertificatesController", CertificatesController);

CertificatesController.$inject = ['$scope', '$state', 'urls', 'HttpRequest', 'toastr', 'validators', 'SweetAlert'];

function CertificatesController($scope, $state, urls, HttpRequest, toastr, validators, SweetAlert) {
  $scope.updateCertificate = updateCertificate;

  var url = urls.BASE_API + '/enrollments/certificates_requested';
  var promise = HttpRequest.send("GET", url);

  promise.then(function (response) {
    $scope.enrollments = response;

    var $contenido = $('#contenido');
    $contenido.addClass("loaded");
  }, function(error){
    toastr.error("Hubo un error");
  });

  function updateCertificate(enrollment) {
    SweetAlert.swal({
      title: "Estás seguro?",
      text: "Esta acción es irreversible!",
      type: "warning",
      showCancelButton: true,
      cancelButtonClass: "button-ln",
      confirmButtonClass: "button-bg primary",
      confirmButtonText: "Si",
      cancelButtonText: "No",
      closeOnConfirm: false,
      closeOnCancel: false
    }, function(isConfirm) {
      if (isConfirm) {
        var url = urls.BASE_API + '/enrollments/' + enrollment.id + '/update_certificate';
        var promise_delete = HttpRequest.send("PUT", url, enrollment);
        promise_delete.then(function(response) {
          SweetAlert.swal("Actualizado!", "Se actualizó el certificado correctamente", "success");
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