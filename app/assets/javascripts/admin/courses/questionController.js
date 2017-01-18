angular.module("admin-app").controller("QuestionController", QuestionController);

QuestionController.$inject = ['$scope', '$state', '$stateParams', 'urls', 'HttpRequest', 'validators', 'SweetAlert'];

function QuestionController($scope, $state, $stateParams, urls, HttpRequest, validators, SweetAlert) {
  $scope.create = create;
  $scope.alternativeDelete = alternativeDelete;

  var questionId = $stateParams.id;

  var url = urls.BASE_API + '/questions/' + questionId + '/alternatives';
  var promise = HttpRequest.send("GET", url);

  promise.then(function (response) {
    $scope.alternatives = response.alternatives;
    $scope.question = response.question;

    var $contenido = $('#contenido');
    $contenido.addClass("loaded");
  }, function(error){
    toastr.error('Hubo un error');
  });

  function create(form, alternative) {
    if (!form.validate()) return false;

    $scope.isLoading = true;

    alternative.question_id = questionId;

    var url = urls.BASE_API + '/alternatives';
    var promise = HttpRequest.send("POST", url, alternative);

    promise.then(function (response) {
      toastr.success(response.message);
      $state.reload();

      $scope.isLoading = false;
    }, function(error){
      toastr.error("Hubo un error");

      $scope.isLoading = false;
    });
  }

  function alternativeDelete(id, $event){
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
        var url = urls.BASE_API + '/alternatives/' + id;
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

  /* ----------------------------------- */
  /* FORM VALIDATE */
  /* ----------------------------------- */
  $scope.validationOptions = {
    debug: false,
    rules: {
      content: {
        required: true
      }
    },
    messages: {
      content: {
        required: 'Dato requerido'
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