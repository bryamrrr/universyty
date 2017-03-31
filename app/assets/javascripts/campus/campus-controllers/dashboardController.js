angular.module('campus-app').controller('DashboardController', DashboardController)

DashboardController.$inject = ['$scope', '$q', '$state', '$stateParams', '$cookies', 'CookieService', 'urls', 'HttpRequest', 'toastr', 'SweetAlert'];
function DashboardController($scope, $q, $state, $stateParams, $cookies,  CookieService, urls, HttpRequest, toastr, SweetAlert) {
  $scope.nickname = CookieService.read('nickname');
  $scope.role = CookieService.read('role');
  $scope.first_entry = CookieService.read('first_entry');
  $scope.ambassador = CookieService.read('ambassador');
  $scope.ambassador_active = CookieService.read('ambassador_active');
  $scope.paydate = CookieService.read('paydate');
  $scope.day = $scope.paydate.substring($scope.paydate.length - 2, $scope.paydate.length);
  $scope.paydate_color = CookieService.read('paydate_color');

  $scope.teamChecked = true;

  $scope.teamChecked = true;

  $scope.check = check;
  $scope.showCheck = false;

  $scope.goTo = goTo;

  updateQuiz();

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

  if ($scope.ambassador === 'true' && $scope.ambassador_active === 'true') {
    $scope.cart.discount = .2 * $scope.cart.total;
    $scope.cart.total = .8 * $scope.cart.total;
  }

  $scope.goAmbassador = goAmbassador;

  if ($scope.first_entry === 'false') {
    $scope.modalOpened = true;
  }

  var url = urls.BASE_API + '/categories';
  var promise = HttpRequest.send('GET', url);

  var urlTeams = urls.BASE_API + '/teams';
  var promiseTeams = HttpRequest.send('GET', urlTeams);

  var allPromise = $q.all([promise, promiseTeams]);

  allPromise.then(function (response) {
    $scope.categories = response[0];

    $scope.team_cart = {
      show: false,
      items: response[1].teams,
      toggle: toggle_team,
      count: response[1].count
    };

    if ($scope.team_cart.count !== 0) $scope.teamChecked = false;

    var url = urls.BASE_API + '/teams/view_teams';
    HttpRequest.send('GET', url);
  }, function (error) {
    toastr.error(error.message);
  });

  function goAmbassador() {
    $scope.modalOpened = false;
    $state.go('ambassador.plan');
    CookieService.put('first_entry', 'true');
  }

  function toggle(hide) {
    $scope.team_cart.show = false;
    if (hide) {
      $scope.cart.show = false;
    } else {
      $scope.cart.show = !$scope.cart.show;
    }
  }

  function toggle_team(hide) {
    $scope.teamChecked = true;
    $scope.cart.show = false;
    if (hide) {
      $scope.team_cart.show = false;
    } else {
      $scope.team_cart.show = !$scope.team_cart.show;
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
            calcTotal($scope.cart.items);
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
      updateCartCookie($scope.cart);
    }
    toastr.success('Curso agregado al carrito de compras');
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
    if ($scope.ambassador === 'true') {
      $scope.cart.discount = .2 * $scope.cart.total;
      $scope.cart.total = .8 * $scope.cart.total;
    }

    $cookies.putObject('cart', cart);
  }

  function check(alternativeSelected) {
    updateQuiz();
    var puntos = 0;

    if (!alternativeSelected) {
      toastr.error('Por favor, selecciona una alternativa');
    } else {
      $scope.showCheck = true;

      if (alternativeSelected.correct_answer) puntos = 2;

      if ($scope.quiz[String(alternativeSelected.question_id)]) {
        CookieService.remove('quiz');
        toastr.error('Hubo un error. Ya no se puede resolver el cuestionario');
        $state.go('courses.view', { id: $stateParams.id, topic: 0 })
      } else {
        $scope.quiz[String(alternativeSelected.question_id)] = puntos;
        $cookies.putObject('quiz', $scope.quiz);
      }
    }
  }

  function updateQuiz() {
    var quiz = $cookies.get('quiz');
    if (quiz === '' || !quiz) {
      $scope.quiz = {};
    } else {
      $scope.quiz = JSON.parse(quiz);
    }
  }

  function goTo() {
    if ($scope.link_url) {
      $state.go('catalog.course', { id: $scope.link_url });
    }
  }
}