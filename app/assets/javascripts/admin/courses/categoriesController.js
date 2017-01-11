angular.module("admin-app").controller("CategoriesController", CategoriesController);

CategoriesController.$inject = ['$scope', '$state', 'urls', 'HttpRequest', 'toastr', 'SweetAlert'];

function CategoriesController($scope, $state, urls, HttpRequest, toastr, SweetAlert) {
  $scope.categoryDelete = categoryDelete;
  $scope.createCategory = createCategory;

  var url = urls.BASE_API + '/categories'
  var promise = HttpRequest.send("GET", url)

  promise.then(function (response) {
    $scope.categories = response;

    var $contenido = $('#contenido');
    $contenido.addClass("loaded");
  }, function (error) {
    toastr.error("Hubo un error");
  });

  function createCategory(form, category) {
    if (!form.validate()) return false;

    var url = urls.BASE_API + '/categories';
    var promise = HttpRequest.send("POST", url, category);

    promise.then(function (response) {
      toastr.success(response.message);
      $scope.categories.push(response.category);
    }, function(error){
      toastr.error("Hubo un error");
    });
  }

  function categoryDelete(id, $event){
    console.log(id);
    SweetAlert.swal({
      title: "Estás seguro?",
      text: "Esta acción es irreversible!",
      type: "warning",
      showCancelButton: true,
      cancelButtonClass: "button-ln",
      confirmButtonClass: "button-bg primary",
      confirmButtonText: "Si, eliminarlo!",
      cancelButtonText: "No, cancelar!",
      closeOnConfirm: false,
      closeOnCancel: false
    }, function(isConfirm){
      if (isConfirm) {
        var url = urls.BASE_API + '/categories/' + id;
        var promise = HttpRequest.send("DELETE", url);
        promise.then(function(response) {
          SweetAlert.swal("Eliminado!", "Se eliminó correctamente", "success");
          $state.reload();
        }, function(error) {
          toastr.error("Hubo un error");
        });
      } else {
        SweetAlert.swal("Cancelado", "Se canceló la acción", "error");
      }
    });
  }

  /* ----------------------------------- */
  /* FORM VALIDATE */
  /* ----------------------------------- */
  $scope.validationOptions = {
    debug: false,
    rules: {
      name: {
        required: true
      },
      slug: {
        required: true
      }
    },
    messages: {
      name: {
        required: 'Dato requerido'
      },
      slug: {
        required: 'Dato requerido'
      }
    },
    highlight: function (element) {
      $(element).parents('div').addClass('error');
      $(element).parents('form').addClass('error');
      $(element).parent('div').addClass('error');
      $(element).addClass('error');
    },
    unhighlight: function (element) {
      $(element).parents('div').removeClass('error');
      $(element).parents('form').removeClass('error');
      $(element).parent('div').removeClass('error');
      $(element).removeClass('error');
    },
    errorElement: "div",
    errorClass:'error error-input',
    validClass:'valid valid-input'
  };
}