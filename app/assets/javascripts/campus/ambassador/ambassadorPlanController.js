angular.module("campus-app").controller("AmbassadorPlanController", AmbassadorPlanController);

AmbassadorPlanController.$inject = ['$scope', '$cookies', '$state', 'CookieService', 'SweetAlert', 'urls', 'HttpRequest', 'toastr', '$location'];

function AmbassadorPlanController($scope, $cookies, $state, CookieService, SweetAlert, urls, HttpRequest, toastr, $location) {
  $scope.pay = pay;
  $scope.culqiFinish = culqiFinish;
  $scope.monthly = $location.search().mensualidad;
  $scope.course_id = $location.$$search.course_id;

  var $contenido = $('#contenido');
  $contenido.addClass("loaded");

  $scope.fullname = localStorage.getItem('fullname');
  $scope.dni = CookieService.read('dni');
  $scope.address = localStorage.getItem('address');
  $scope.city = localStorage.getItem('city');
  $scope.token = CookieService.read('token');
  var nickname = CookieService.read('nickname');

  $scope.paymentMethod = '1';
  $scope.plan_amount = 2900;
  $scope.payment_title = 'Plan Embajador';
  $scope.payment_description = 'Plan Embajador';

  function pay(paymentMethod, cart) {
    $scope.isLoading = true;

    if ($scope.dni && $scope.dni !== 'null') {
      if (paymentMethod === '1') {
        $('#culqi-button').click();
        return;
      }
      processPayment(paymentMethod, cart);
    } else {
      SweetAlert.swal({
        title: "Faltan datos de usuario",
        text: "Por favor, agregar DNI en sus datos",
        type: "warning",
        showCancelButton: false,
        confirmButtonClass: "button-bg primary",
        confirmButtonText: "Ir a Mis Datos",
        closeOnConfirm: true
      }, function(isConfirm){
        if (isConfirm) {
          $state.go('user.data');
        }
      });
    }
  }

  function processPayment(paymentMethod, cart) {
    var url = urls.BASE_API + '/movements/ambassador/' + paymentMethod;
    var data = {
      nickname: nickname,
      course_id: $location.$$search.course_id,
    };
    var promise = HttpRequest.send("POST", url, data);
    promise.then(function (response) {
      var messageTitle = '¡Buenísimo!';
      var messageText = 'Tu pedido ha sido reservado y está pendiente de pago.';
      var messageButton = 'Ir a mis pagos';

      if (response.message != 'Pedido realizado') {
        messageTitle = '¡Buenísimo!';
        messageText = 'Pago realizado con Éxito.';
      }

      SweetAlert.swal({
        title: messageTitle,
        text: messageText,
        type: "success",
        showCancelButton: false,
        confirmButtonClass: "button-bg primary",
        confirmButtonText: messageButton,
        closeOnConfirm: true
      }, function(isConfirm){
        if (isConfirm) {
          $state.go('user.billing');
        }
      });
    }, function (error) {

    });
  }

  function culqiFinish() {
    $scope.isLoading = false;
    if ($('#culqi-finish').data('error') != undefined) {
      toastr.error($('#culqi-finish').data('error'));
      location.reload();
    } else {
      $scope.$parent.ambassador = 'true';
      $scope.$parent.ambassador_active = 'true';
      $scope.$parent.day = new Date().getDate();
      $scope.paydate_color = 'green';
      CookieService.put('ambassador', 'true');
      CookieService.put('ambassador_active', 'true');
      CookieService.put('paydate', new Date().getDate());
      CookieService.put('paydate_color', 'green');

      SweetAlert.swal({
        title: '¡Buenísimo!',
        text: 'Pago realizado con Éxito.',
        type: "success",
        showCancelButton: false,
        confirmButtonClass: "button-bg primary",
        confirmButtonText: 'OK',
        closeOnConfirm: true
      }, function(isConfirm){
        if (isConfirm) {
          $state.go('ambassador.billing');
        }
      });
    }
  }
}