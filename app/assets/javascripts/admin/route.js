angular.module("admin-app").config(routes);

routes.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
function routes($stateProvider, $urlRouterProvider, $locationProvider) {

  $stateProvider
    .state('welcome', {
      url: '/admin',
      abstract: true,
      data: {
        'needAuth': true,
        'title': 'Bienvenido'
      },
      views: {
        dashboard: {
          templateUrl: 'admin/index.html'
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
          templateUrl: 'admin/welcome/home.html',
          controller: 'WelcomeHomeController'
        }
      }
    })

    // Courses
    .state('courses', {
      url: '/admin/cursos',
      abstract: true,
      data: {
        'needAuth': true,
        'title': 'Cursos'
      },
      views: {
        dashboard: {
          templateUrl: 'admin/index.html'
        }
      }
    })
    .state('courses.create', {
      url: '/crear',
      data: {
        title: 'Crear Curso'
      },
      views: {
        'content@courses': {
          templateUrl: 'admin/courses/create.html',
          controller: 'CreateCourseController'
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
          templateUrl: 'admin/courses/list.html',
          controller: 'CoursesListController'
        }
      }
    })
    .state('courses.categories', {
      url: '/categorias',
      data: {
        title: 'Categorías'
      },
      views: {
        'content@courses': {
          templateUrl: 'admin/courses/categories.html',
          controller: 'CategoriesController'
        }
      }
    })
    .state('courses.edit', {
      url: '/:id/editar',
      data: {
        title: 'Editar Curso'
      },
      views: {
        'content@courses': {
          templateUrl: 'admin/courses/edit.html',
          controller: 'EditCourseController'
        }
      }
    })
    .state('courses.modules', {
      url: '/:id/modulos',
      data: {
        title: 'Módulos'
      },
      views: {
        'content@courses': {
          templateUrl: 'admin/courses/modules.html',
          controller: 'ModulesController'
        }
      }
    })
    .state('courses.topics', {
      url: '/:id/temario',
      data: {
        title: 'Temario'
      },
      views: {
        'content@courses': {
          templateUrl: 'admin/courses/topics.html',
          controller: 'TopicsController'
        }
      }
    })
    .state('courses.topicedit', {
      url: '/:id/tema/editar',
      data: {
        title: 'Editar Tema'
      },
      views: {
        'content@courses': {
          templateUrl: 'admin/courses/topicedit.html',
          controller: 'TopicEditController'
        }
      }
    })
    .state('courses.quiz', {
      url: '/:id/quiz',
      data: {
        title: 'Cuestionario'
      },
      views: {
        'content@courses': {
          templateUrl: 'admin/courses/quiz.html',
          controller: 'QuizController'
        }
      }
    })
    .state('courses.categoryedit', {
      url: '/categorias/:id',
      data: {
        title: 'Editar Categría'
      },
      views: {
        'content@courses': {
          templateUrl: 'admin/courses/category-edit.html',
          controller: 'CategoryEditController'
        }
      }
    })

    // User
    .state('user', {
      url: '/admin/usuario',
      abstract: true,
      data: {
        'needAuth': true,
        'title': 'Usuario'
      },
      views: {
        dashboard: {
          templateUrl: 'admin/index.html'
        }
      }
    })
    .state('user.create', {
      url: '/crear',
      data: {
        title: 'Crear Usuario'
      },
      views: {
        'content@user': {
          templateUrl: 'admin/user/create.html',
          controller: 'CreateUserController'
        }
      }
    })
    .state('user.list', {
      url: '/lista',
      data: {
        title: 'Lista de Usuarios'
      },
      views: {
        'content@user': {
          templateUrl: 'admin/user/list.html',
          controller: 'UsersListController'
        }
      }
    })
    .state('user.data', {
      url: '/datos',
      data: {
        title: 'Mis datos'
      },
      views: {
        'content@user': {
          templateUrl: 'admin/user/data.html',
          controller: 'UserDataController'
        }
      }
    })


  // default fall back route
  $urlRouterProvider.otherwise('/admin/inicio');

  // enable HTML5 Mode for SEO
  $locationProvider.html5Mode(true);
}