angular.module('shared').directive("headerBreadCrumb", headerBreadCrumb);

headerBreadCrumb.$inject = ['$state'];
function headerBreadCrumb($state) {
  return {
    restrict: "AE",
    link: function(scope, el, attr) {
      scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        // parent title
        scope.hasParent = false;
        if(typeof $state.$current.parent.data !== 'undefined'){
          scope.parentTitle = $state.$current.parent.data.title;
          scope.hasParent = true;
        }
        // current title
        scope.currentTitle = $state.$current.data.title;
      });
      scope.myTemplate = 'shared/shared-directives/header-bread-crumb.html';
    },
    template: '<div ng-include="myTemplate"></div>'
  }
}