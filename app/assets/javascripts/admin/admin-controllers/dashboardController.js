angular.module('admin-app').controller('DashboardController', DashboardController)

DashboardController.$inject = ['$scope', '$state', 'CookieService'];
function DashboardController($scope, $state,  CookieService) {
  $scope.nickname = CookieService.read('nickname');
  $scope.role = CookieService.read('role');
}