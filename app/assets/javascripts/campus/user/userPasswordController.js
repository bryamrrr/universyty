angular.module("campus-app").controller("UserPasswordController", UserPasswordController);

UserPasswordController.$inject = ['$scope', 'urls', 'CookieService', 'HttpRequest', 'toastr', 'validators'];

function UserPasswordController($scope, urls, CookieService, HttpRequest, toastr, validators) {
  $scope.showPassword = showPassword;
  $scope.changePassword = changePassword;

  $scope.passwords = {
    'old': 'password',
    'new': 'password',
    'repeat': 'password'
  }

  var url = urls.BASE_API + '/users/' + CookieService.read("nickname");
  var promise = HttpRequest.send("GET", url);

  promise.then(function (response) {
    $scope.user = response;
    var $contenido = $('#contenido');
    $contenido.addClass("loaded");
  }, function(error){
    toastr.error("Hubo un error");
  });

  function showPassword(type) {
    ($scope.passwords[type] === 'password') ? $scope.passwords[type] = 'text' : $scope.passwords[type] = 'password';
  }

  function changePassword(form, oldPassword, newPassword) {
    if (!form.validate()) return false;

    var data = {
      old_password: oldPassword,
      new_password: newPassword
    };
    var url = urls.BASE_API + '/users/' + CookieService.read("nickname") + '/change_password';
    var promise = HttpRequest.send("PUT", url, data);

    $scope.isLoading = true;

    promise.then(function (response) {
      toastr.success(response.message);
      $scope.isLoading = false;
    }, function(error) {
      toastr.error(error.message);
      $scope.isLoading = false;
    });
  }

  /* ----------------------------------- */
  /* FORM VALIDATE */
  /* ----------------------------------- */
  $scope.validationOptions = {
    debug: false,
    rules: {
      old_password: {
        required: true
      },
      new_password: {
        required: true,
        minlength: 6,
        regex: validators.password
      },
      repeat_new_password: {
        required: true,
        equalTo: '#new_password',
        regex: validators.password
      },
    },
    messages: {
      old_password: {
        required: 'Dato requerido'
      },
      new_password: {
        required: 'Dato requerido',
        minlength: 'Mínimo 6 caracteres',
        regex: 'Debe contener mayúsculas, minúsculas, números y caracteres especiales'
      },
      repeat_new_password: {
        required: 'Dato requerido',
        equalTo: 'Las contraseñas no coinciden',
        regex: 'Debe contener mayúsculas, minúsculas, números y caracteres especiales'
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