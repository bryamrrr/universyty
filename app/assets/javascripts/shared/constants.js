/* global malarkey:false, toastr:false, moment:false */
(function() {
  'use strict';

  angular
    .module('shared')
    .constant('urls', {
      BASE: 'http://localhost:3000 http://wituniversity-staging.herokuapp.com http://wituniversity.herokuapp.com',
      BASE_API: 'http://wituniversity-staging.herokuapp.com/api/v1'
    })
    .constant('toast',{
      DELAY: 5500
    })
    .constant('validators',{
      // 'password': /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$@#;&=-_:!*])(?!.*\s).{6,14}$/,
      'password': /^(?=.{6,14})(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[@#$%^&+=!*]).*$/,
      // 'password_antiguo': '^([A-Za-z0-9$@#;&=-_]){4,}$',
      'integer': /^\d+$/,
      'decimal': /^\d+(\.\d{1,2})?$/,
      'document_number': /^[a-z0-9]{8,15}$/,
      'business_name': /^[A-Za-záéíóúñ]{2,}([\s][A-Za-záéíóúñ]{2,})+$/,
      'email': /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z]{2,3})?(\.[a-z]{2,11})?$/,
      'phone': /0{0,2}([\+]?[\d]{1,3} ?)?([\(]([\d]{2,3})[)] ?)?[0-9][0-9 \-]{6,}( ?([xX]|([eE]xt[\.]?)) ?([\d]{1,5}))?/,
      'address': /^[A-Za-záéíóúñ0-9_\s'\"°.-]{10,200}$/,
      'observacion': "/^[a-zA-Z0-9_\s#'\"°.ñÑáéíóú&,,()?¿+!-]{10,1000}$s/",
      'entero': "/^\d+$s/",
      'eticket': "/^\d{28}$s/",
      'dominio': "/^([0-9a-z-]+\.)?[0-9a-z-]+\.[a-z]{2,7}$s/i",
      'login_usuario': "/^[a-zA-Z0-9_.ñÑáéíóú&@-]{3,20}$s/",
      'username': /^[a-zA-Z0-9_.ñÑáéíóú&@-]{3,20}$/,
      'domain': /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$/,
      'check_first_character': /^[a-z+]{1}[a-z0-9]+$/,
      'domain_without_zone': /^[A-Z0-9]{0,63}$/i,
      'ip': /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/,
      'dns': /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9])$/,
      'clave_cpanel': /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[&@*$#%!:;+=\/_,.-])(?!.*\s)[a-zA-Z\d&@*$#%!:;+=\/_,.-]{8,14}$/
    })

})();
