angular
  .module('shared')
  .config(['toastrConfig', '$animateProvider', function(toastrConfig, $animateProvider) {
    angular.extend(toastrConfig, {
      "closeButton": false,
      "debug": false,
      "newestOnTop": false,
      "progressBar": false,
      "positionClass": "toast-top-full-width",
      "preventDuplicates": false,
      "onclick": null,
      "showDuration": "300",
      "hideDuration": "500",
      "timeOut": "2000",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    });

    $animateProvider.classNameFilter(/animate/);
  }]);