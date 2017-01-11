angular.module("shared").service("MessagesService", MessagesService);

MessagesService.$inject = ["$mdToast", "toast"];

function MessagesService ($mdToast, toast) {

  this.display = function (content, typeClass, delay) {
    if (!content) content = "Hubo un error";

    delay = delay || toast.DELAY;
    $mdToast.show(
      $mdToast.simple({
        controller: 'ToasterController',
        template: ' '+
                  '<md-toast class="custom md-center '+typeClass +'"> '+
                  '<span flex>'+ content +'</span>'+
                  '<md-button class="md-action" ng-click="closeToast()" aria-label="Cerrar">'+
                  '   <md-icon class="fa fa-times" ></md-icon>'+
                  '  </md-button>'+
                  '</md-toast>'
      })
              .position('top left right')
              .hideDelay(delay)
    );
  }
}