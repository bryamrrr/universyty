angular.module("shared").service("HttpRequest", HttpRequest);

HttpRequest.$inject = ['$http', '$q'];

function HttpRequest($http, $q) {
  $http.defaults.useXDomain = true;

  this.send = function (method, url, data) {
    var defer = $q.defer();
    $http({
      method: method,
      url: url,
      timeout: 20000,
      headers: {'Content-Type': 'application/json'},
      data: {'data': data}
    })
    .success(function (response) {
      defer.resolve(response);
    })
    .error(function (response) {
      defer.reject(response);
    });

    return defer.promise;
  };
}