angular.module("admin-app").controller("ProfessorCreateController", ProfessorCreateController);

ProfessorCreateController.$inject = ['$scope', '$stateParams', '$state', 'urls', 'HttpRequest', 'validators'];

function ProfessorCreateController($scope, $stateParams, $state, urls, HttpRequest, validators) {
  $scope.create = create;

  var $contenido = $('#contenido');
  $contenido.addClass("loaded");

  var courseId = $stateParams.id;

  function create(form, professor) {
    if (!form.validate()) return false;

    $scope.isLoading = true;

    professor.course_id = courseId;

    var url = urls.BASE_API + '/professors';
    var promise = HttpRequest.send("POST", url, professor);

    promise.then(function (response) {
      toastr.success(response.message);
      $state.go('courses.professors', { id: courseId });

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
      name: {
        required: true
      },
      bio: {
        required: true
      },
      image: {
        required: true
      },
      minibio: {
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
      },
      minibio: {
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