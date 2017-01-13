angular.module("admin-app").controller("ProfessorEditController", ProfessorEditController);

ProfessorEditController.$inject = ['$scope', '$stateParams', '$state', 'urls', 'HttpRequest', 'validators'];

function ProfessorEditController($scope, $stateParams, $state, urls, HttpRequest, validators) {
  $scope.edit = edit;

  var url = urls.BASE_API + '/professors/' + $stateParams.id;
  var promise = HttpRequest.send('GET', url);

  promise.then(function (response) {
    $scope.professor = response;

    var $contenido = $('#contenido');
    $contenido.addClass("loaded");
  }, function (error) {
    toastr.error(error.message);
  })

  function edit(form, professor) {
    if (!form.validate()) return false;

    var url = urls.BASE_API + '/professors/' + $stateParams.id;
    var promise = HttpRequest.send("PUT", url, professor);

    promise.then(function (response) {
      toastr.success(response.message);
      $state.go('courses.professors', { id: $stateParams.courseId });
    }, function(error){
      toastr.error("Hubo un error");
    });
  }

  /* ----------------------------------- */
  /* FORM VALIDATE */
  /* ----------------------------------- */
  $scope.validationOptions = {
    debug: false,
    rules: {
      name: {
        required: true
      },
      bio: {
        required: true
      },
      image: {
        required: true
      }
    },
    messages: {
      name: {
        required: 'Dato requerido'
      },
      bio: {
        required: 'Dato requerido'
      },
      image: {
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