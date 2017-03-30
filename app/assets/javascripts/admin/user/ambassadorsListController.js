angular.module("admin-app")
  .controller("AmbassadorsListController", AmbassadorsListController);

AmbassadorsListController.$inject = ['$scope', '$state', 'urls', 'HttpRequest', 'toastr', 'validators', 'SweetAlert'];

function AmbassadorsListController($scope, $state, urls, HttpRequest, toastr, validators, SweetAlert) {
  $scope.userBlock = userBlock;
  $scope.options = [
    { id: 1, label: "Todos" },
    { id: 2, label: "Activo" },
    { id: 3, label: "Inactivo" },
    { id: 4, label: "Por vencer" }
  ];

  $scope.filter = {
    text: "",
    option: { id: 1 }
  };

  var url = urls.BASE_API + '/users/ambassadors/all';
  var promise = HttpRequest.send("GET", url);

  promise.then(function (response) {
    $scope.users = response;
    var $contenido = $('#contenido');
    $contenido.addClass("loaded");
  }, function(error){
    toastr.error("Hubo un error");
  });

  function userBlock(id, $event){
    SweetAlert.swal({
      title: "Estás seguro de cambiar el estado?",
      text: "Esta acción se puede revertir!",
      type: "warning",
      showCancelButton: true,
      cancelButtonClass: "button-ln",
      confirmButtonClass: "button-bg primary",
      confirmButtonText: "Si",
      cancelButtonText: "No, cancelar!",
      closeOnConfirm: false,
      closeOnCancel: false
    }, function(isConfirm){
      if (isConfirm) {
        var url = urls.BASE_API + '/users/' + id + '/block';
        var promise_delete = HttpRequest.send("PUT", url);
        promise_delete.then(function(response) {
          SweetAlert.swal("Éxito!", "Se ha cambiado el estado del usuario", "success");
          $state.reload();
        }, function(error) {
          toastr.error("Hubo un error");
        });
      } else {
        SweetAlert.swal("Cancelado", "Se canceló la acción", "error");
      }
    });
  }
}


angular.module("admin-app").filter("filterUser", function () {
  return function(input, scope) {
    if (input) {
      var out = [];
      var provisional = [];
      for (var i = 0; i < input.length; i++) {
        if (scope.filter.text == "" && scope.filter.option.id == 1) {
          out.push(input[i]);
        } else if (scope.filter.text != "" && scope.filter.option.id == 1) {
          if (input[i].nickname.indexOf(scope.filter.text) > -1 || input[i].fullname.indexOf(scope.filter.text) > -1) {
            out.push(input[i]);
          }
        } else if (scope.filter.text == "" && scope.filter.option.id != 1) {
          if (scope.filter.option.id == 2 && input[i].ambassador_active == true) {
            out.push(input[i]);
          } else if (scope.filter.option.id == 3 && input[i].ambassador_active == false) {
            out.push(input[i]);
          } else if (scope.filter.option.id == 4 && input[i].ambassador_active == true) {
            var dateObj = Date.now();
            dateObj += 1000 * 60 * 60 * 29 * 3;
            dateObj = new Date(dateObj);
            if (new Date(input[i].paydate + " 00:00") <= dateObj) {
              out.push(input[i]);
            }
          }
        } else if (scope.filter.text != "" && scope.filter.option.id != 1) {
          console.log("Entró aquí");
          if (scope.filter.option.id == 2 && input[i].ambassador_active == true) {
            provisional.push(input[i]);
          } else if (scope.filter.option.id == 3 && input[i].ambassador_active == false) {
            provisional.push(input[i]);
          } else if (scope.filter.option.id == 4 && input[i].ambassador_active == true) {
            var dateObj = Date.now();
            dateObj += 1000 * 60 * 60 * 29 * 3;
            dateObj = new Date(dateObj);
            if (new Date(input[i].paydate + " 00:00") <= dateObj) {
              provisional.push(input[i]);
            }
          }
        }
      }

      if (provisional.length > 0) {
          for (var j = 0; j < provisional.length; j++) {
            if (provisional[j].nickname.indexOf(scope.filter.text) > -1 || provisional[j].fullname.indexOf(scope.filter.text) > -1) {
              out.push(provisional[j]);
            }
          }
        }

      return out;
    }
  };
})