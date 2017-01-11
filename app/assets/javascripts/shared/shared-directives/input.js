angular.module('shared').directive("input", input);

function input() {
  return {
    restrict: 'AC',
    scope: {
      model: '=ngModel'
    },
    link: function(scope, element, attr) {
      scope.$watch("model", function(new_value, old_value) {
        if(typeof new_value !== 'undefined'){
          element.addClass('input-has-value');
        }else{
          element.removeClass('input-has-value');
        }
      });
    }
  }
}