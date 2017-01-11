angular.module("admin-app").controller("UserDataController", UserDataController);

UserDataController.$inject = ['$scope', '$q', 'urls', 'CookieService', 'HttpRequest', 'validators', 'toastr'];

function UserDataController($scope, $q, urls, CookieService, HttpRequest, validators, toastr) {
  $scope.updateData = updateData;

  $scope.provinceConfig = {
    create: true,
    valueField: 'id',
    labelField: 'name',
    delimiter: '|',
    maxItems: 1,
    onInitialize: function(selectize){
    },
  };

  $scope.genderConfig = {
    create: true,
    valueField: 'name',
    labelField: 'name',
    delimiter: '|',
    maxItems: 1,
    onInitialize: function(selectize){
    },
  };

  $scope.genders = [{name: 'Masculino'}, {name:'Femenino'}]

  var url = urls.BASE_API + '/users/' + CookieService.read("nickname");
  var promise = HttpRequest.send("GET", url);

  var urlProvinces = urls.BASE_API + '/provinces';
  var promiseProvinces = HttpRequest.send("GET", urlProvinces);

  var allPromises = $q.all([promise, promiseProvinces]);

  allPromises.then(function (response) {
    $scope.user = response[0];
    $scope.provinces = response[1];

    $scope.fullname = angular.copy($scope.user.fullname);

    var $contenido = $('#contenido');
    $contenido.addClass("loaded");
  }, function(error){
    toastr.error("Hubo un error");
  });

  function updateData(form, user) {
    if (!form.validate()) return false;

    $scope.isLoading = true;

    var url = urls.BASE_API + '/users/' + CookieService.read("nickname");
    var promise = HttpRequest.send("PUT", url, user);

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
      fullname: {
        required: true
      },
      email: {
        required: true,
        regex: validators.email
      },
      phone: {
        regex: validators.phone
      },
      dni: {
        maxlength: 8,
        minlength: 8,
        regex: validators.integer
      }
    },
    messages: {
      fullname: {
        required: 'Dato requerido'
      },
      email: {
        required: 'Dato requerido',
        regex: 'Email inválido'
      },
      phone: {
        regex: 'Formato inválido'
      },
      dni: {
        maxlength: 'Formato inválido',
        minlength: 'Formato inválido',
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