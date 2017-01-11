angular.module("admin-app").controller("ModulesController", ModulesController);

ModulesController.$inject = ['$scope', '$state', '$stateParams', 'urls', 'HttpRequest', 'toastr', 'validators', 'SweetAlert'];

function ModulesController($scope, $state, $stateParams, urls, HttpRequest, toastr, validators, SweetAlert) {
  $scope.moduleDelete = moduleDelete;
  $scope.create = create;

  var courseId = $stateParams.id;

  var url = urls.BASE_API + '/courses/' + courseId + '/modules';
  var promise = HttpRequest.send("GET", url);

  promise.then(function (response) {
    $scope.modules = response.parts;
    $scope.course = response.course.title;

    var $contenido = $('#contenido');
    $contenido.addClass("loaded");
  }, function(error){
    toastr.error("Hubo un error");
  });

  function moduleDelete(id, $event){
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
        var url = urls.BASE_API + '/parts/' + id;
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

  function create(form, part) {
    if (!form.validate()) return false;

    $scope.isLoading = true;

    part.number = parseInt(part.number);
    part.course_id = courseId;

    var url = urls.BASE_API + '/parts';
    var promise = HttpRequest.send("POST", url, part);

    promise.then(function (response) {
      toastr.success(response.message);
      $state.reload();

      $scope.isLoading = false;
    }, function(error){
      toastr.error("Hubo un error");

      $scope.isLoading = false;
    });
  }

  /* ----------------------------------- */
  /* FORM VALIDATE */
  /* ----------------------------------- */
  $scope.validationOptions = {
    debug: false,
    rules: {
      title: {
        required: true
      },
      number: {
        required: true,
        regex: validators.integer
      }
    },
    messages: {
      title: {
        required: 'Dato requerido'
      },
      number: {
        required: 'Dato requerido',
        regex: 'Formato inválido'
      }
    },
    highlight: function (element) {
      $(element).parents('div').addClass('error');
      $(element).parents('form').addClass('error');
      $(element).parent('div').addClass('error');
      $(element).addClass('error');
    },
    unhighlight: function (element) {
      $(element).parents('div').removeClass('error');
      $(element).parents('form').removeClass('error');
      $(element).parent('div').removeClass('error');
      $(element).removeClass('error');
    },
    errorElement: "div",
    errorClass:'error error-input',
    validClass:'valid valid-input'
  };
}