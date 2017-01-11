angular.module("campus-app").config(routes);

routes.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
function routes($stateProvider, $urlRouterProvider, $locationProvider) {

  $stateProvider
    .state('welcome', {
      url: '/campus',
      abstract: true,
      data: {
        'needAuth': true,
        'title': 'Bienvenido'
      },
      views: {
        dashboard: {
          templateUrl: 'campus/index.html'
        }
      }
    })
    .state('welcome.home', {
      url: '/inicio',
      data: {
        title: 'Inicio'
      },
      views: {
        'content@welcome': {
          templateUrl: 'campus/welcome/home.html',
          controller: 'WelcomeHomeController'
        }
      }
    })

    // Catalog
    .state('catalog', {
      url: '/campus/catalogo',
      abstract: true,
      data: {
        'needAuth': true,
        'title': 'Catálogo'
      },
      views: {
        dashboard: {
          templateUrl: 'campus/index.html'
        }
      }
    })
    .state('catalog.categories', {
      url: '/categorias/:slug',
      data: {
        title: 'Lista'
      },
      views: {
        'content@catalog': {
          templateUrl: 'campus/catalog/index.html',
          controller: 'CatalogController'
        }
      }
    })

    // Courses
    .state('courses', {
      url: '/campus/cursos',
      abstract: true,
      data: {
        'needAuth': true,
        'title': 'Mis Cursos'
      },
      views: {
        dashboard: {
          templateUrl: 'campus/index.html'
        }
      }
    })
    .state('courses.list', {
      url: '/lista',
      data: {
        title: 'Lista de Cursos'
      },
      views: {
        'content@courses': {
          templateUrl: 'campus/courses/list.html',
          controller: 'CoursesListController'
        }
      }
    })
    .state('courses.grades', {
      url: '/notas',
      data: {
        title: 'Notas'
      },
      views: {
        'content@courses': {
          templateUrl: 'campus/courses/grades.html',
          controller: 'CoursesGradesController'
        }
      }
    })

    // User
    .state('user', {
      url: '/campus/datos',
      abstract: true,
      data: {
        'needAuth': true,
        'title': 'Datos'
      },
      views: {
        dashboard: {
          templateUrl: 'campus/index.html'
        }
      }
    })
    .state('user.data', {
      url: '/datos-personales',
      data: {
        title: 'Datos Personales'
      },
      views: {
        'content@user': {
          templateUrl: 'campus/user/data.html',
          controller: 'UserDataController'
        }
      }
    })
    .state('user.bank', {
      url: '/datos-bancarios',
      data: {
        title: 'Datos Bancarios'
      },
      views: {
        'content@user': {
          templateUrl: 'campus/user/bank.html',
          controller: 'UserBankController'
        }
      }
    })
    .state('user.password', {
      url: '/cambiar-contrasena',
      data: {
        title: 'Cambiar Contraseña'
      },
      views: {
        'content@user': {
          templateUrl: 'campus/user/password.html',
          controller: 'UserPasswordController'
        }
      }
    })
    .state('user.payments', {
      url: '/pagos',
      data: {
        title: 'Mis Pagos'
      },
      views: {
        'content@user': {
          templateUrl: 'campus/user/payments.html',
          controller: 'UserPaymentsController'
        }
      }
    })

    // Ambassador
    .state('ambassador', {
      url: '/campus/embajador',
      abstract: true,
      data: {
        'needAuth': true,
        'title': 'Embajador'
      },
      views: {
        dashboard: {
          templateUrl: 'campus/index.html'
        }
      }
    })
    .state('ambassador.plan', {
      url: '/plan',
      data: {
        title: 'Plan Embajador'
      },
      views: {
        'content@ambassador': {
          templateUrl: 'campus/ambassador/plan.html',
          controller: 'AmbassadorPlanController'
        }
      }
    })
    .state('ambassador.list', {
      url: '/lista',
      data: {
        title: 'Embajadores'
      },
      views: {
        'content@ambassador': {
          templateUrl: 'campus/ambassador/list.html',
          controller: 'AmbassadorListController'
        }
      }
    })
    .state('ambassador.preferencial', {
      url: '/preferenciales',
      data: {
        title: 'Clientes Preferenciales'
      },
      views: {
        'content@ambassador': {
          templateUrl: 'campus/ambassador/preferencial.html',
          controller: 'AmbassadorPreferencialController'
        }
      }
    })
    .state('ambassador.financial', {
      url: '/estado-financiero',
      data: {
        title: 'Estado Financiero'
      },
      views: {
        'content@ambassador': {
          templateUrl: 'campus/ambassador/financial.html',
          controller: 'AmbassadorFinancialController'
        }
      }
    })
    .state('ambassador.billing', {
      url: '/facturacion',
      data: {
        title: 'Facturación'
      },
      views: {
        'content@ambassador': {
          templateUrl: 'campus/ambassador/billing.html',
          controller: 'AmbassadorBillingController'
        }
      }
    })

  // default fall back route
  $urlRouterProvider.otherwise('/campus/inicio');

  // enable HTML5 Mode for SEO
  $locationProvider.html5Mode(true);
}