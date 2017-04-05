angular.module("admin-app").controller("WelcomeImageController", WelcomeImageController);

WelcomeImageController.$inject = ['$scope', 'urls', 'HttpRequest'];

function WelcomeImageController($scope, urls, HttpRequest) {
  $scope.edit = edit;

  var url = urls.BASE_API + '/informations/show_welcome_image';
  var promise = HttpRequest.send('GET', url);

  $scope.coursesConfig = {
    create: false,
    valueField: 'id',
    labelField: 'title',
    delimiter: '|',
    maxItems: 1,
    allowEmptyOption: true,
    onInitialize: function(selectize) {
    },
  };

  promise.then(function (response) {
    $scope.image = response.image;
    $scope.courses = response.courses;

    var $contenido = $('#contenido');
    $contenido.addClass("loaded");
  }, function (error) {
    console.error(error);
  });

  function edit(form, image) {
    if (!form.validate()) return false;

    if (image.link_url === undefined) image.link_url = null;

    var url = urls.BASE_API + '/informations/update_welcome_image';
    var promise = HttpRequest.send("PUT", url, image);

    promise.then(function (response) {
      toastr.success(response.message);
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
      image: {
        required: true
      }
    },
    messages: {
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