angular.module("admin-app").controller("UsersListController", UsersListController);

UsersListController.$inject = ['$scope', '$state', 'urls', 'HttpRequest', 'toastr', 'validators', 'SweetAlert'];

function UsersListController($scope, $state, urls, HttpRequest, toastr, validators, SweetAlert) {
  $scope.userBlock = userBlock;

  var url = urls.BASE_API + '/users';
  var promise = HttpRequest.send("GET", url);

  promise.then(function (response) {
    $scope.users = response;
    var $contenido = $('#contenido');
    $contenido.addClass("loaded");
  }, function(error){
    toastr.error("Hubo un error");
  });

  function userBlock(id, $event){
    SweetAlert.swal({
      title: "Estás seguro de cambiar el estado?",
      text: "Esta acción se puede revertir!",
      type: "warning",
      showCancelButton: true,
      cancelButtonClass: "button-ln",
      confirmButtonClass: "button-bg primary",
      confirmButtonText: "Si",
      cancelButtonText: "No, cancelar!",
      closeOnConfirm: false,
      closeOnCancel: false
    }, function(isConfirm){
      if (isConfirm) {
        var url = urls.BASE_API + '/users/' + id + '/block';
        var promise_delete = HttpRequest.send("PUT", url);
        promise_delete.then(function(response) {
          SweetAlert.swal("Éxito!", "Se ha cambiado el estado del usuario", "success");
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