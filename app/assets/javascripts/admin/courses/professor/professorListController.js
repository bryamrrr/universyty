angular.module("admin-app").controller("ProfessorListController", ProfessorListController);

ProfessorListController.$inject = ['$scope', '$state', '$stateParams', 'urls', 'HttpRequest', 'SweetAlert'];

function ProfessorListController($scope, $state, $stateParams, urls, HttpRequest, SweetAlert) {
  $scope.goToCreate = goToCreate;
  $scope.professorDelete = professorDelete;
  var courseId = $stateParams.id;

  var url = urls.BASE_API + '/courses/' + courseId + '/professors';
  var promise = HttpRequest.send("GET", url);

  promise.then(function (response) {
    console.log(response);
    $scope.professors = response.professors;
    $scope.course = response.course;

    var $contenido = $('#contenido');
    $contenido.addClass("loaded");
  }, function(error){
    toastr.error("Hubo un error");
  });

  function goToCreate() {
    $state.go('courses.professors-create', { id: courseId });
  }

  function professorDelete(id, $event){
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
        var url = urls.BASE_API + '/professors/' + id;
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