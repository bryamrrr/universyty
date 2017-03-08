angular.module("campus-app").controller("AmbassadorFinancialController", AmbassadorFinancialController);

AmbassadorFinancialController.$inject = ['$scope', '$q', 'urls', 'HttpRequest', 'CookieService', 'toastr', 'validators'];

function AmbassadorFinancialController($scope, $q, urls, HttpRequest, CookieService, toastr, validators) {
  // $('.modal-overlay').show();
  $scope.hidePassword = true;
  $('.modal-overlay').hide();
  $scope.sendPassword = sendPassword;
  $scope.transfer = transfer;
  $scope.pay = pay;
  $scope.withdraw = withdraw;
  $scope.close = close;
  $scope.goTransfer = goTransfer;

  $scope.transferdata = {};
  $scope.paydata = {};
  $scope.withdrawdata = {};

  var url = urls.BASE_API + '/bonos';
  var promise = HttpRequest.send('GET', url);

  var urlUser = urls.BASE_API + '/users/' + CookieService.read('nickname');
  var promiseUser = HttpRequest.send('GET', urlUser);

  var allPromise = $q.all([promise, promiseUser]);

  allPromise.then(function (response) {
    $scope.movements = response[0];
    $scope.user = response[1];

    console.log("HOLA", response);

    var $contenido = $('#contenido');
    $contenido.addClass("loaded");
  }, function (error) {
    console.log("ERROR: ", error);
  });

  function sendPassword(password) {
    $scope.isLoading = true;
    var nickname = CookieService.read('nickname');

    var url = urls.BASE_API + '/users/confirm_password';
    var data = {
      nickname: nickname,
      password: password
    };

    var promise = HttpRequest.send('POST', url, data);

    promise.then(function (response) {
      if (response.errors) {
        toastr.error(response.errors);
      } else {
        toastr.success(response.message);
        $scope.hidePassword = true;
        $('.modal-overlay').hide();
      }
    }, function (error) {
      console.error(error);
    });
  }

  function transfer() {
    $scope.showTransfer = true;
    $('.modal-overlay').show();
  }

  function pay() {
    $scope.showPay = true;
    $('.modal-overlay').show();
  }

  function withdraw() {
    $scope.showWithdraw = true;
    $('.modal-overlay').show();
  }
  function close() {
    $scope.showTransfer = false;
    $scope.showPay = false;
    $scope.showWithdraw = false;
    $('.modal-overlay').hide();
  }

  function goTransfer(form, data) {
    if (!form.validate()) return false;
    $scope.isLoading = true;

    var url = urls.BASE_API + '/movements/transfer';
    var promise = HttpRequest.send('POST', url, data);

    promise.then(function (response) {
      $scope.isLoading = false;
      if (response.errors) {
        toastr.error(response.errors);
      } else {
        $scope.showTransfer = false;
        $('.modal-overlay').hide();

        toastr.success(response.message);
        $scope.user.balance -= Math.round(data.amount);
      }
    }, function (error) {
      //
    });
  }

  /* ----------------------------------- */
  /* FORM VALIDATE */
  /* ----------------------------------- */
  $scope.payOptions = {
    debug: false,
    rules: {
      payuser: {
        required: true
      },
      payamount: {
        required: true,
        regex: validators.integer
      }
    },
    messages: {
      payuser: {
        required: 'Dato requerido'
      },
      payamount: {
        required: 'Dato requerido',
        regex: 'Solo números enteros'
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

  $scope.transferOptions = {
    debug: false,
    rules: {
      transferuser: {
        required: true
      },
      transferamount: {
        required: true,
        regex: validators.integer
      }
    },
    messages: {
      transferuser: {
        required: 'Dato requerido'
      },
      transferamount: {
        required: 'Dato requerido',
        regex: 'Solo números enteros'
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

  $scope.withdrawOptions = {
    debug: false,
    rules: {
      withdrawamount: {
        required: true,
        regex: validators.integer
      }
    },
    messages: {
      withdrawamount: {
        required: 'Dato requerido',
        regex: 'Sólo números enteros'
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