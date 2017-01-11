angular.module("shared").directive("navScroll", navScroll);

navScroll.$inject = ['$timeout', '$log'];
function navScroll($timeout, $log){
  return {
    restrict: "A",
    link: function (scope, ele, attr) {
      $timeout(function () {
        $(ele).slimScroll({
          height: "100%"
        });
      });
    }
  }
}