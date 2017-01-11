toastr.options = {
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
}

$(document).on('turbolinks:load', function () {

  // Click to scroll
  $(".scroll-marketing").click(function() {
    console.log("test");
    $('html,body').animate({ scrollTop: $("#marketing-courses").offset().top}, 'slow');
  });
  $(".scroll-development").click(function() {
    $('html,body').animate({ scrollTop: $("#development-courses").offset().top}, 'slow');
  });
  $(".scroll-personal").click(function() {
    $('html,body').animate({ scrollTop: $("#personal-courses").offset().top}, 'slow');
  });

  var token = checkCookie("token");
  var role = checkCookie("role");
  var location = window.location;
  var baseUrl = location.protocol + "//" + location.host + "/"

  if (token !== "") {
    if (role === "Admin") {
      window.location.href = baseUrl + "admin/inicio";
    } else {
      window.location.href = baseUrl + "campus/inicio";
    }
  }

  function checkCookie(key, c1){
    c = document.cookie.match('(^|;)\\s*' + key + '\\s*=\\s*([^;]+)');
    return c ? c.pop() : '';
  }

  $.validator.methods.regex = function (value, element, regexp) {
    var re = new RegExp(regexp);
    return this.optional(element) || re.test(value);
  };

  $("form#register-form").validate({
    rules: {
      'user[fullname]': "required",
      'user[email]': {
        required: true,
        email: true
      },
      'user[nickname]': "required",
      'user[password]': {
        required: true,
        minlength: 6,
        regex: /(?=.{6,14})(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[@#$%^&+=!*]).*/
      },
      'user[dni]': "required"
    },
    messages: {
      'user[fullname]': "Por favor, ingrese su nombre completo",
      'user[email]': "Por favor, ingrese un correo válido",
      'user[nickname]': "Por favor, ingrese un nombre de usuario válido",
      'user[password]': {
        required: "Por favor, ingrese una contraseña",
        minlength: "Mínimo 6 caracteres",
        regex: "Debe contener mayúsculas, minúsculas, números y al menos un caracter especial (@#$%^&+=!*)"
      },
      'user[dni]': "Por favor, ingrese su DNI"
    },
    submitHandler: function(form) {
      $("input[type=submit]").attr("disabled", true);
      form.submit();
    }
  });

  $("form#login-form").validate({
    rules: {
      nickname: "required",
      password: {
        required: true,
        minlength: 6,
        regex: /(?=.{6,14})(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[@#$%^&+=!*]).*/
      }
    },
    messages: {
      nickname: "Por favor, ingrese un usuario válido",
      password: {
        required: "Por favor, ingrese una contraseña",
        minlength: "Mínimo 6 caracteres",
        regex: "Debe contener mayúsculas, minúsculas, números y al menos un caracter especial (@#$%^&+=!*)"
      }
    },
    submitHandler: function(form) {
      $("#login-button").attr("disabled", false);
      form.submit();
    }
  });

  $("#typed").typed({
    stringsElement: $('#typed-strings'),
    startDelay: 300,
    typeSpeed: 60,
    backSpeed: 30,
    backDelay: 2000,
    loop: true
  });

  var owl = $("#owl-demo");

  owl.owlCarousel({
    items : 4,
    itemsDesktop : [1000,3],
    itemsDesktopSmall : [900,2],
    itemsTablet: [600,1],
    itemsMobile : false
  });

  // Custom Navigation Events
  $(".next").click(function() {
    owl.trigger('owl.next');
  });
  $(".prev").click(function() {
    owl.trigger('owl.prev');
  });

  $(function() {
    $('select').selectize({
      placeholder: "Escoge una provincia..."
    });
  });

  $('.main-login input#password').on('keyup blur', function () {
      if ($('#login-form').valid()) {
        $('#login-button').prop('disabled', false);
      } else {
          $('#login-button').prop('disabled', 'disabled');
      }
  });

  $("#login-button").click(function() {
    var data = {
      nickname: $("#nickname").val(),
      password: $("#password").val()
    };
    data = JSON.stringify(data);

    var location = window.location;
    var baseUrl = location.protocol + "//" + location.host + "/"
    var url = baseUrl + "/api/v1/users/login";

    $.ajax({
      type: "POST",
      url: url,
      data: data,
      success: function (data) {
        putCookie("role", data.role);
        putCookie("nickname", data.nickname);
        putCookie("token", data.token);
        putCookie("first_entry", data.first_entry);
        if (data.role === "Admin") {
          window.location.href = baseUrl + "admin/inicio";
        } else {
          window.location.href = baseUrl + "campus/inicio";
        }
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
        console.log("ERROR!");
        console.log("xml", XMLHttpRequest);
        console.log("textstatus", textStatus);
        console.log("error", errorThrown);

        if (errorThrown === "Unauthorized") {
          toastr.error('El usuario no existe o las credenciales son incorrectas');
        } else if (errorThrown === "Forbidden") {
          toastr.error('Usuario bloqueado');
        }
      },
      contentType: 'application/json',
      dataType: 'JSON'
    });


    function putCookie(name, value, expires, path, domain) {
      var cookie = name + "=" + escape(value) + ";path=/;";

      if (expires) {
        // If it's a date
        if(expires instanceof Date) {
          // If it isn't a valid date
          if (isNaN(expires.getTime()))
            expires = new Date();
        }
        else
          expires = new Date(new Date().getTime() + parseInt(expires) * 1000 * 60 * 60 * 24 * 30);

        cookie += "expires=" + expires.toGMTString() + ";";
      }

      if (path)
        cookie += "path=" + path + ";";
      if (domain)
        cookie += "domain=" + domain + ";";

      document.cookie = cookie;
    }
  });
});

$(window).scroll(function() {
  var scroll = $(window).scrollTop();

  if (scroll >= 74) {
    $("header").addClass("scrolled");
  } else {
    $("header").removeClass("scrolled");
  }
});