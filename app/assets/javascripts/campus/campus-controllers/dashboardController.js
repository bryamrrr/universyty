angular.module('campus-app').controller('DashboardController', DashboardController)

DashboardController.$inject = ['$scope', '$state', 'CookieService', 'urls', 'HttpRequest', 'toastr', 'SweetAlert'];
function DashboardController($scope, $state,  CookieService, urls, HttpRequest, toastr, SweetAlert) {
  $scope.nickname = CookieService.read('nickname');
  $scope.role = CookieService.read('role');
  $scope.first_entry = CookieService.read('first_entry');

  $scope.cart = {
    show: false,
    items: [],
    toggle: toggle,
    removeItem: removeItem
  };

  $scope.goAmbassador = goAmbassador;

  if ($scope.first_entry === 'false') {
    $scope.modalOpened = true;
  }

  var url = urls.BASE_API + '/categories';
  var promise = HttpRequest.send('GET', url);

  promise.then(function (response) {
    $scope.categories = response;
  }, function (error) {
    toastr.error(error.message);
  });

  function goAmbassador() {
    $scope.modalOpened = false;
    $state.go('ambassador.plan');
    CookieService.put('first_entry', 'true');
  }

  function toggle(hide) {
    if (hide) {
      $scope.cart.show = false;
    } else {
      $scope.cart.show = !$scope.cart.show;
    }
  }

  function removeItem() {
    SweetAlert.swal({
      title: "Estás seguro?",
      text: "Se quitará el curso del carrito",
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
        // var url = urls.BASE_API + '/courses/' + id;
        // var promise_delete = HttpRequest.send("DELETE", url);
        // promise_delete.then(function(response) {
        //   SweetAlert.swal("Eliminado!", "Se eliminó correctamente", "success");
        //   $state.reload();
        // }, function(error) {
        //   toastr.error("Hubo un error");
        // });
        SweetAlert.swal("Eliminado", "Se quitó el curso del carrito", "success");
      } else {
        SweetAlert.swal("Cancelado", "Se canceló la acción", "error");
      }
    });
  }
}