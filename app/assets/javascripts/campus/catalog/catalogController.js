angular.module("campus-app").controller("CatalogController", CatalogController);

CatalogController.$inject = ['$scope', '$stateParams', 'urls', 'HttpRequest'];

function CatalogController($scope, $stateParams, urls, HttpRequest) {
  var slug = $stateParams.slug;
  var url = urls.BASE_API + '/courses/categories/' + slug;
  var promise = HttpRequest.send('GET', url);

  promise.then(function (response) {
    $scope.courses = response.courses;
    $scope.category = response.category;

    var $contenido = $('#contenido');
    $contenido.addClass("loaded");
  }, function (error) {
    toastr.error('Hubo un error');
  });
}