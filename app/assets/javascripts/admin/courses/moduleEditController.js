angular.module("admin-app").controller("ModuleEditController", ModuleEditController);

ModuleEditController.$inject = ['$scope', '$state', '$stateParams', 'toastr', 'urls', 'HttpRequest', 'validators'];

function ModuleEditController($scope, $state, $stateParams, toastr, urls, HttpRequest, validators) {
  $scope.update = update;

  var url = urls.BASE_API + '/parts/' + $stateParams.id;
  var promise = HttpRequest.send("GET", url);

  promise.then(function (response) {
    $scope.part = response;

    var $contenido = $('#contenido');
    $contenido.addClass("loaded");
  }, function(error){
    toastr.error("Hubo un error");

    var $contenido = $('#contenido');
    $contenido.addClass("loaded");
  });

  function update(form, part) {
    if (!form.validate()) return false;

    $scope.isLoading = true;

    part.number = parseInt(part.number);

    var url = urls.BASE_API + '/parts/' + $stateParams.id;
    var promise = HttpRequest.send("PUT", url, part);

    promise.then(function (response) {
      toastr.success(response.message);
      $state.go('courses.modules', {id: part.course_id});

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