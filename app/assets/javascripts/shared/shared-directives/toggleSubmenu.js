angular.module("shared").directive("toggleSubmenu", toggleSubmenu);

function toggleSubmenu() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      $(element).click(function(){
        element.parent().toggleClass('toggled');
      });
    }
  }
}