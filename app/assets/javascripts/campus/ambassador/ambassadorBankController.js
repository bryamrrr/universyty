angular.module("campus-app").controller("AmbassadorBankController", AmbassadorBankController);

AmbassadorBankController.$inject = ['$scope', 'urls', 'HttpRequest', 'CookieService'];

function AmbassadorBankController($scope, urls, HttpRequest, CookieService) {
  $scope.updateBank = updateBank;

  var url = urls.BASE_API + '/users/' + CookieService.read("nickname");
  var promise = HttpRequest.send("GET", url);

  promise.then(function (response) {
    $scope.user = response;

    $scope.fullname = angular.copy($scope.user.fullname);

    var $contenido = $('#contenido');
    $contenido.addClass("loaded");
  }, function(error){
    toastr.error("Hubo un error");
  });

  function updateBank(form, user) {
    if (!form.validate()) return false;

    $scope.isLoading = true;

    var url = urls.BASE_API + '/users/' + CookieService.read("nickname") + '/change_bank';
    var data = {
      titular: user.bank_titular,
      account: user.bank_account
    }
    var promise = HttpRequest.send("PUT", url, data);

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
      titular: {
        required: true
      },
      account: {
        required: true
      }
    },
    messages: {
      titular: {
        required: 'Dato requerido'
      },
      account: {
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