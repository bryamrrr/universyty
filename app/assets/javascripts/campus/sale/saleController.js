angular.module("campus-app").controller("SaleController", SaleController);

SaleController.$inject = ['$scope', '$cookies', '$state', 'CookieService', 'SweetAlert', 'urls', 'HttpRequest', 'toastr'];

function SaleController($scope, $cookies, $state, CookieService, SweetAlert, urls, HttpRequest, toastr) {
  $scope.pay = pay;

  var $contenido = $('#contenido');
  $contenido.addClass("loaded");

  $scope.fullname = $cookies.get('fullname');
  $scope.dni = CookieService.read('dni');
  $scope.address = CookieService.read('address');
  $scope.city = CookieService.read('city');
  var ambassador = CookieService.read('ambassador');
  var nickname = CookieService.read('nickname');

  var cart = $cookies.get('cart');
  if (cart) $scope.cart = JSON.parse(cart);
  console.log($scope.cart);

  if (ambassador === 'true') {
    $scope.cart.discount = .2 * $scope.cart.total;
    $scope.cart.total = .8 * $scope.cart.total;
  }

  $scope.paymentMethod = '2';

  function pay(paymentMethod, cart) {
    $scope.isLoading = true;
    if ($scope.dni) {
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
        if (paymentMethod === '2' || paymentMethod === '3') {
          var messageTitle = '¡Buenísimo!';
          var messageText = 'Pago realizado con Éxito.';
          var messageButton = 'OK';
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
            if (paymentMethod === '2' || paymentMethod === '3') {
              $state.go('user.payments');
            } else {
              console.log("Ya se realizó el pago automático. Qué hacer ahora?");
            }
          }
        });
      }
    }, function (error) {

    });
  }
}