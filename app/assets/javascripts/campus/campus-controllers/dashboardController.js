angular.module('campus-app').controller('DashboardController', DashboardController)

DashboardController.$inject = ['$scope', '$state', '$cookies', 'CookieService', 'urls', 'HttpRequest', 'toastr', 'SweetAlert'];
function DashboardController($scope, $state, $cookies,  CookieService, urls, HttpRequest, toastr, SweetAlert) {
  $scope.nickname = CookieService.read('nickname');
  $scope.role = CookieService.read('role');
  $scope.first_entry = CookieService.read('first_entry');
  $scope.ambassador = CookieService.read('ambassador');


  var cart = $cookies.get('cart');
  if (cart === '' || !cart) {
    $scope.cart = {
      show: false,
      items: [],
      toggle: toggle,
      removeItem: removeItem,
      addItem: addItem,
      total: 0
    };
  } else {
    $scope.cart = JSON.parse(cart);
    $scope.cart.show = false;
    $scope.cart.toggle = toggle;
    $scope.cart.removeItem = removeItem;
    $scope.cart.addItem = addItem;
  }

  $scope.goAmbassador = goAmbassador;

  if ($scope.first_entry === 'false') {
    $scope.modalOpened = true;
  }

  var url = urls.BASE_API + '/categories';
  var promise = HttpRequest.send('GET', url);

  promise.then(function (response) {
    $scope.categories = response;
  }, function (error) {
    toastr.error(error.message);
  });

  function goAmbassador() {
    $scope.modalOpened = false;
    $state.go('ambassador.plan');
    CookieService.put('first_entry', 'true');
  }

  function toggle(hide) {
    if (hide) {
      $scope.cart.show = false;
    } else {
      $scope.cart.show = !$scope.cart.show;
    }
  }

  function removeItem(item) {
    SweetAlert.swal({
      title: "Estás seguro?",
      text: "Se quitará el curso del carrito",
      type: "warning",
      showCancelButton: true,
      cancelButtonClass: "button-ln",
      confirmButtonClass: "button-bg primary",
      confirmButtonText: "Si",
      cancelButtonText: "No",
      closeOnConfirm: false,
      closeOnCancel: false
    }, function(isConfirm){
      if (isConfirm) {
        var i = 0;
        for (i; i < $scope.cart.items.length; i++) {
          if (item.id === $scope.cart.items[i].id) {
            $scope.cart.items.splice(i, 1);
            break;
          }
        }
        updateCartCookie($scope.cart);
        SweetAlert.swal("Eliminado", "Se quitó el curso del carrito", "success");
      } else {
        SweetAlert.swal("Cancelado", "Se canceló la acción", "error");
      }
    });
  }

  function addItem(item) {
    if (!itemExists(item)) {
      $scope.cart.items.push(item);
      calcTotal($scope.cart.items);
    }
    toastr.success('Curso agregado al carrito de compras');
    updateCartCookie($scope.cart);
  }

  function calcTotal(items) {
    var total = 0;
    var i = 0;

    for (i; i < items.length; i++) {
      total += parseFloat(items[i].pricetag);
    }

    $scope.cart.total = total;
  }

  function itemExists(item) {
    var i = 0;
    for (i; i < $scope.cart.items.length; i++) {
      if (item.id === $scope.cart.items[i].id) return true;
    }
    return false;
  }

  function updateCartCookie(cart) {
    $cookies.putObject('cart', cart);
  }
}