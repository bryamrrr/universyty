angular.module("admin-app").controller("PendingController", PendingController);

PendingController.$inject = ['$scope', 'urls', 'HttpRequest', '$uibModal'];

function PendingController($scope, urls, HttpRequest, $uibModal) {
  $scope.openDetails = openDetails;

  var url = urls.BASE_API + '/movements/pendings';
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
      templateUrl: 'admin/financial/pending-details.html',
      controller: ['$scope', function($scope) {
        $scope.cart = payment;
      }],
      size: size,
      appendTo: parentElem
    });
  };
}