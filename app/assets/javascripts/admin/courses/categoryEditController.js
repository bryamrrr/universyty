angular.module("admin-app").controller("CategoryEditController", CategoryEditController);

CategoryEditController.$inject = ['$scope', '$state', '$stateParams', 'urls', 'HttpRequest', 'toastr'];

function CategoryEditController($scope, $state, $stateParams, urls, HttpRequest, toastr) {
  $scope.editCategory = editCategory;

  var url = urls.BASE_API + '/categories/' + $stateParams.id;
  var promise = HttpRequest.send('GET', url);

  promise.then(function (response) {
    $scope.category = response;

    var $contenido = $('#contenido');
    $contenido.addClass("loaded");
  }, function (error) {
    toastr.error(error.message);
  })

  function editCategory(form, category) {
    if (!form.validate()) return false;

    var url = urls.BASE_API + '/categories/' + $stateParams.id;
    var promise = HttpRequest.send("PUT", url, category);

    promise.then(function (response) {
      toastr.success(response.message);
      $state.go('courses.categories');
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
      slug: {
        required: true
      }
    },
    messages: {
      name: {
        required: 'Dato requerido'
      },
      slug: {
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