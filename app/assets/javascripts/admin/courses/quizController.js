angular.module("admin-app").controller("QuizController", QuizController);

QuizController.$inject = ['$scope', '$state', '$stateParams', 'urls', 'HttpRequest', 'validators', 'SweetAlert'];

function QuizController($scope, $state, $stateParams, urls, HttpRequest, validators, SweetAlert) {
  $scope.create = create;
  $scope.questionDelete = questionDelete;

  var moduleId = $stateParams.idModule;

  var url = urls.BASE_API + '/parts/' + moduleId + '/questions';
  var promise = HttpRequest.send("GET", url);

  promise.then(function (response) {
    $scope.questions = response.questions;
    $scope.module = response.part;
    $scope.course = response.course;

    var $contenido = $('#contenido');
    $contenido.addClass("loaded");
  }, function(error){
    toastr.error('Hubo un error');
  });

  function create(form, question) {
    if (!form.validate()) return false;

    $scope.isLoading = true;

    question.number = parseInt(question.number);
    question.part_id = moduleId;

    var url = urls.BASE_API + '/questions';
    var promise = HttpRequest.send("POST", url, question);

    promise.then(function (response) {
      toastr.success(response.message);
      $state.reload();

      $scope.isLoading = false;
    }, function(error){
      toastr.error("Hubo un error");

      $scope.isLoading = false;
    });
  }

  function questionDelete(id, $event){
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
        var url = urls.BASE_API + '/questions/' + id;
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

  /* ----------------------------------- */
  /* FORM VALIDATE */
  /* ----------------------------------- */
  $scope.validationOptions = {
    debug: false,
    rules: {
      content: {
        required: true
      },
      number: {
        required: true,
        regex: validators.integer
      }
    },
    messages: {
      content: {
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