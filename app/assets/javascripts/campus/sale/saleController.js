angular.module("campus-app").controller("SaleController", SaleController);

SaleController.$inject = ['$scope', '$cookies', '$state', 'CookieService', 'SweetAlert', 'urls', 'HttpRequest', 'toastr'];

function SaleController($scope, $cookies, $state, CookieService, SweetAlert, urls, HttpRequest, toastr) {
  $scope.pay = pay;
  $scope.culqiFinish = culqiFinish;

  var $contenido = $('#contenido');
  $contenido.addClass("loaded");

  $scope.fullname = localStorage.getItem('fullname');
  $scope.dni = CookieService.read('dni');
  $scope.address = CookieService.read('address');
  $scope.city = localStorage.getItem('city');
  $scope.token = CookieService.read('token');
  var ambassador = CookieService.read('ambassador');
  var nickname = CookieService.read('nickname');

  var cart = $cookies.get('cart');
  if (cart) $scope.cart = JSON.parse(cart);

  $scope.paymentMethod = '1';
  $scope.plan_amount = Math.round($scope.cart.total) * 100;
  $scope.payment_title = 'Pago de cursos';
  $scope.payment_description = 'Pago de cursos';

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
    var url = urls.BASE_API + '/movements/payment/' + paymentMethod;
    var data = {
      cart: cart,
      nickname: nickname
    };
    var promise = HttpRequest.send("POST", url, data);
    promise.then(function (response) {
      if (response.errors) {
        toastr.error(response.errors);
      } else {
        CookieService.remove('cart');

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
            $state.go('user.payments');
          }
        });
      }
    }, function (error) {

    });
  }

  function culqiFinish() {
    $scope.isLoading = false;
    if ($('#culqi-finish').data('error') != undefined) {
      toastr.error($('#culqi-finish').data('error'));
      location.reload();
    } else {
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
          CookieService.remove('cart');
          $state.go('user.payments');
        }
      });
    }
  }
}