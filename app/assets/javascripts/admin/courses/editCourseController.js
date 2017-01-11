angular.module('admin-app').controller('EditCourseController', EditCourseController);

EditCourseController.$inject = ['$scope', '$q', '$state', '$stateParams', 'urls', 'HttpRequest', 'toastr', 'validators'];
function EditCourseController($scope, $q, $state, $stateParams, urls, HttpRequest, toastr, validators) {

  $scope.categoryConfig = {
    create: true,
    valueField: 'id',
    labelField: 'name',
    delimiter: '|',
    maxItems: 1,
    onInitialize: function(selectize){
    },
  };

  var url = urls.BASE_API + '/courses/' + $stateParams.id;
  var promise = HttpRequest.send("GET", url);

  var urlCategories = urls.BASE_API + '/categories';
  var promiseCategories = HttpRequest.send("GET", urlCategories);

  var allPromises = $q.all([promise, promiseCategories]);

  allPromises.then(function (response) {
    console.log(response);
    $scope.course = response[0];
    $scope.categories = response[1];

    var $contenido = $('#contenido');
    $contenido.addClass("loaded");
  }, function(error){
    toastr.error("Hubo un error");
  });

  $scope.updateCourse = updateCourse;

  function updateCourse(form, course) {
    if (!form.validate()) return false;

    course.pricetag = parseFloat(course.pricetag);
    course.discount = parseFloat(course.discount);

    if (course.priority) course.priority = parseInt(course.priority);

    var url = urls.BASE_API + '/courses/' + $stateParams.id;
    var promise = HttpRequest.send("PUT", url, course);

    promise.then(function (response) {
      console.log(response);
      toastr.success(response.message);
      $state.go('courses.list');
    }, function(error){
      toastr.error("Hubo un error");
    });
  }

  /* ----------------------------------- */
  /* FORM VALIDATE */
  /* ----------------------------------- */
  $scope.validationOptions = {
    debug: false,
    rules: {
      title: {
        required: true
      },
      description: {
        required: true
      },
      goal: {
        required: true
      },
      certificate: {
        required: true
      },
      level: {
        required: true
      },
      classes: {
        required: true
      },
      pricetag: {
        required: true,
        regex: validators.decimal
      },
      discount: {
        regex: validators.decimal
      },
      duration: {
        required: true
      },
      background: {
        required: true
      },
      trailer: {
        required: true
      },
      priority: {
        regex: validators.integer
      }
    },
    messages: {
      title: {
        required: 'Dato requerido'
      },
      description: {
        required: 'Dato requerido'
      },
      goal: {
        required: 'Dato requerido'
      },
      certificate: {
        required: 'Dato requerido'
      },
      level: {
        required: 'Dato requerido'
      },
      classes: {
        required: 'Dato requerido'
      },
      pricetag: {
        required: 'Dato requerido',
        regex: 'Valor inválido'
      },
      discount: {
        regex: 'Valor inválido'
      },
      duration: {
        required: 'Dato requerido'
      },
      background: {
        required: 'Dato requerido'
      },
      trailer: {
        required: 'Dato requerido'
      },
      priority: {
        regex: 'Valor inválido'
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