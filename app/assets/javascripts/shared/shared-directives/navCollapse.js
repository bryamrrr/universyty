angular.module("shared").directive("navCollapse", navCollapse);

navCollapse.$inject = ['$timeout', '$log'];
function navCollapse($timeout, $log){
  return {
  restrict: "A",
    link: function (scope, ele, attr) {
      ele = $(ele);
      $timeout(function () {

        var a = ele.find("a"),
                li_level1 = ele.children("li"),
                a_level1 = li_level1.children("a");

        a_level1.on("click", function () {
          var self = $(this),
          self_li = self.closest("li");

          if(!self_li.hasClass("nav-header")){
            if(!self_li.hasClass("open")){
              self_li.addClass("open");
            }else{
              self_li.removeClass("open");
            }
        }
        });
      });
    }
  }
}