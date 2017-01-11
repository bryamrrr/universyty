angular.module("admin-app").controller("CreateUserController", CreateUserController);

CreateUserController.$inject = ['$scope', '$state', 'urls', 'HttpRequest', 'toastr', 'validators'];

function CreateUserController($scope, $state, urls, HttpRequest, toastr, validators) {
  $scope.generate = generate;
  $scope.create = create;

  $scope.user = {};

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

  var url = urls.BASE_API + '/provinces';
  var promise = HttpRequest.send("GET", url);

  promise.then(function (response) {
    $scope.provinces = response;

    var $contenido = $('#contenido');
    $contenido.addClass("loaded");
  }, function(error){
    toastr.error("Hubo un error");
  });

  function create(form, user) {
    if (!form.validate()) return false;

    $scope.isLoading = true;

    var url = urls.BASE_API + '/users';
    var promise = HttpRequest.send("POST", url, $scope.user);

    promise.then(function (response) {
      toastr.success(response.message);
      $state.go('user.list');
      $scope.isLoading = false;
    }, function(error){
      toastr.error("Hubo un error");
      $scope.isLoading = false;
    });
  }

  function generate() {
    var min = "abcdefghijklmnopqrstuvwxyz";
    var may = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var n = "123456789";
    var e ="@#$%^&+=!*"; // regex validator
    var min_random = '';
    var may_random = '';
    var n_random = '';
    var e_random = '';

    for (var x = 0; x < 3; x++) {
        var i = Math.floor(Math.random() * min.length);
        min_random += min.charAt(i);
    }

    for (var x = 0; x < 3; x++) {
        var i = Math.floor(Math.random() * may.length);
        may_random += may.charAt(i);
    }

    for (var y = 0; y < 3; y++) {
        var i = Math.floor(Math.random() * n.length);
        n_random += n.charAt(i);
    }

    for (var z = 0; z < 3; z++) {
        var i = Math.floor(Math.random() * e.length);
        e_random += e.charAt(i);
    }

    var string_generated = min_random + may_random + n_random + e_random;
    var array_generated = string_generated.split("");

    $scope.user.password = _shuffle(array_generated).join("");
  }

  function _shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
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
      },
      password: {
        required: true,
        regex: validators.password
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
      },
      password: {
        required: 'Dato requerido',
        regex: 'Debe contener mayúsculas, minúsculas, números y caracteres especiale'
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