angular
  .module('campus-app')
  .run(runBlock);

runBlock.$inject = ['$rootScope', '$state', 'AuthService'];
function runBlock($rootScope, $state, AuthService) {
  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
    if(!AuthService.isAuthenticated() && toState.data.needAuth) {
      event.preventDefault();

      var location = window.location;
      var baseUrl = location.protocol + "//" + location.host + "/";
      window.location.href = baseUrl + "login";
    }
    if(AuthService.isAuthenticated() && !toState.data.needAuth) {
      event.preventDefault();
      $state.go('welcome.home');
    }
  });

  // $rootScope.$on('$stateChangeSuccess', function (event, toState) {
  //   if(toState.data && toState.data.title){
  //     $rootScope.title = toState.data.title;
  //   }
  // });

  $rootScope.$state = $state;
}