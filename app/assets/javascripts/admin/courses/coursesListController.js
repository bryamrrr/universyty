angular.module("admin-app").controller("CoursesListController", CoursesListController);

CoursesListController.$inject = ['$scope', '$state', 'urls', 'HttpRequest', 'toastr', 'validators', 'SweetAlert'];

function CoursesListController($scope, $state, urls, HttpRequest, toastr, validators, SweetAlert) {
  $scope.courseDelete = courseDelete;
  $scope.coursePublish = coursePublish;

  var url = urls.BASE_API + '/courses';
  var promise = HttpRequest.send("GET", url);

  promise.then(function (response) {
    $scope.courses = response;
    var $contenido = $('#contenido');
    $contenido.addClass("loaded");
  }, function(error){
    toastr.error("Hubo un error");
  });

  function courseDelete(id, $event){
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
        var url = urls.BASE_API + '/courses/' + id;
        var promise_delete = HttpRequest.send("DELETE", url);
        promise_delete.then(function(response) {
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

  function coursePublish(id, $event){
    SweetAlert.swal({
      title: "Estás seguro?",
      text: "Esta acción cambiará el estado del curso!",
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
        var url = urls.BASE_API + '/courses/' + id + '/change_state';
        var promise_delete = HttpRequest.send("GET", url);
        promise_delete.then(function(response) {
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