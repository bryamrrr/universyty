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

  $('#js-loading-content').hide();

  $('#js-search-by-text').click(function () {
    var text = $(this).siblings('input').val();
    showCoursesFromText(text);
  });
  $('#user_search').keyup(function(e){
    if (e.keyCode === 13) {
      var text = $(this).val();
      showCoursesFromText(text);
    }
  });

  $(".radio-container input").click(function() {
    console.log($(this));
    if ($(this)[0].id === 'js-instructor') {
      console.log($('#js-sponsor'));
      $('#js-sponsor').hide();
    } else if ($(this)[0].id === 'js-alumno') {
      $('#js-sponsor').show();
    }
  });

  var token = checkCookie("token");
  var role = checkCookie("role");
  var location = window.location;
  var baseUrl = location.protocol + "//" + location.host + "/";

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
      'user[dni]': "required",
      'user[city]': "required"
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
      'user[dni]': "Por favor, ingrese su DNI",
      'user[city]': "Por favor, ingrese su ciudad"
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
      console.log(form);
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

  $('#user_province').selectize({
    placeholder: "Escoge una provincia..."
  });
  $('#user_category').selectize({
    placeholder: "Escoge una categoría...",
    onChange: function(value) {
      showCoursesFromCategory(value);
    }
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
        var city = '';
        if (data.user.province) {
          city = data.user.province.name;
        } else {
          city = data.user.city;
        }
        if (data.user.instructor) {
          putCookie("role", "Instructor");
        } else {
          putCookie("role", data.user.role.name);
        }
        putCookie("nickname", data.user.nickname);
        putCookie("token", data.token);
        putCookie("first_entry", data.user.first_entry);
        putCookie("city", city);
        putCookie("address", data.user.address);
        putCookie("fullname", data.user.fullname);
        putCookie("dni", data.user.dni);
        putCookie("ambassador", data.user.ambassador);
        putCookie("ambassador_active", data.user.ambassador_active);
        putCookie("paydate", data.user.paydate);
        putCookie("paydate_color", data.paydate_color);
        if (data.user.role.name === "Admin") {
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

function showCoursesFromCategory(id) {
  var location = window.location;
  var baseUrl = location.protocol + "//" + location.host + "/"
  var url = baseUrl + "/api/v1/courses/categories-id/" + id;

  $('#js-loading-content').show();
  $('#js-courses-container').hide();
  $('.courses').addClass('loading');
  $('html, body').animate({ scrollTop: $("#js-courses").offset().top - 58}, 'slow');

  $.ajax({
    type: "GET",
    url: url,
    success: function (data) {
      $('#js-loading-content').hide();
      $('#js-courses-container').show();
      $('.courses').removeClass('loading');
      showCourses(data);
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
}

function showCoursesFromText(text) {
  var location = window.location;
  var baseUrl = location.protocol + "//" + location.host + "/"
  var url = baseUrl + "/api/v1/courses/text/" + text;

  $('#js-loading-content').show();
  $('#js-courses-container').hide();
  $('.courses').addClass('loading');
  $('html, body').animate({ scrollTop: $("#js-courses").offset().top - 58}, 'slow');

  $.ajax({
    type: "GET",
    url: url,
    success: function (data) {
      $('#js-loading-content').hide();
      $('#js-courses-container').show();
      $('.courses').removeClass('loading');
      showCourses(data, text);
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
}

function showCourses(courses, text) {
  console.log(courses);
  if (courses[0]) {
    if (text) {
      $('#js-category-title').text('Resultados de "' + text + '"');
    } else {
      $('#js-category-title').text(courses[0].category.name);
    }
  } else {
    $('#js-category-title').text('No se encontraron resultados');
  }

  $('#js-flex-container .course').remove();

  var i = 0;
  for (i; i < courses.length; i++) {
    addCourseTemplate(courses[i]);
  }
}

function addCourseTemplate(course) {
  var textPrice = '';
  var discount = '';

  (course.free) ? textPrice = 'Gratis' : textPrice = 'S/ ' + parseInt(course.pricetag);

  if (course.discount) discount = 'S/ ' + parseInt(course.discount);

  var html = '<article class="course">\
          <a href="/cursos/' + course.id + '">\
          <div class="professor-hover">\
            <div class="professor-hover-content">\
              <figure>\
                <img src="' + course.professors[0].image_url + '" alt="">\
              </figure>\
              <h5>' + course.professors[0].name + '</h5>\
              <p class="tagline">' + course.professors[0].minibio + '</p>\
            </div>\
          </div>\
          <div class="course-image">\
            <img src="' + course.background_url + '" />\
          </div>\
          <div class="course-title">\
            <h4>' + course.title + '</h4>\
          </div>\
          <div class="course-details">\
            <div class="course-time">\
              <i class="fa fa-clock-o" aria-hidden="true"></i>\
              <span>' + course.duration + '</span>\
            </div>\
            <div class="course-price">\
                <span>' + textPrice + '</span>\
            </div>\
            <div class="course-discount">' + discount + '</div>\
          </div>\
          </a>\
        </article>';

  $("#js-flex-container").append(html);
}













