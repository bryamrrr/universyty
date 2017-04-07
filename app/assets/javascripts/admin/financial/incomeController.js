angular.module("admin-app").controller("IncomeController", IncomeController);

IncomeController.$inject = ['$scope', 'urls', 'HttpRequest', '$uibModal'];

function IncomeController($scope, urls, HttpRequest, $uibModal) {
  $scope.openDetails = openDetails;

  var url = urls.BASE_API + '/movements/paids';
  var promise = HttpRequest.send('GET', url);

  promise.then(function (response) {
    $scope.payments = response;
    console.log(response);

    var $contenido = $('#contenido');
    $contenido.addClass("loaded");
  }, function (error) {
    console.log(error);
  });

  function openDetails(payment, size, parentSelector) {
    $scope.cart = payment;
    var parentElem = parentSelector ? angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
    $uibModal.open({
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'admin/financial/paid-details.html',
      controller: ['$scope', function($scope) {
        var total = 0;
        $scope.cart = payment;
        if (payment.discount) {
          for (var i = 0; i < payment.products.length; i++) {
            total += parseInt(payment.products[i].pricetag);
          }
          $scope.cart.discount_applied = total - payment.total;
        }
      }],
      size: size,
      appendTo: parentElem
    });
  };
}