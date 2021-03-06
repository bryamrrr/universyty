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
    .state('courses.moduleedit', {
      url: '/:id/modulo/editar',
      data: {
        title: 'Editar Módulo'
      },
      views: {
        'content@courses': {
          templateUrl: 'admin/courses/moduleedit.html',
          controller: 'ModuleEditController'
        }
      }
    })
    .state('courses.professors', {
      url: '/:id/profesores',
      data: {
        title: 'Profesores'
      },
      views: {
        'content@courses': {
          templateUrl: 'admin/courses/professor/list.html',
          controller: 'ProfessorListController'
        }
      }
    })
    .state('courses.professors-create', {
      url: '/:id/profesores/crear',
      data: {
        title: 'Agregar Profesor'
      },
      views: {
        'content@courses': {
          templateUrl: 'admin/courses/professor/create.html',
          controller: 'ProfessorCreateController'
        }
      }
    })
    .state('courses.professors-edit', {
      url: '/:courseId/profesores/:id/editar',
      data: {
        title: 'Editar Profesores'
      },
      views: {
        'content@courses': {
          templateUrl: 'admin/courses/professor/edit.html',
          controller: 'ProfessorEditController'
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
      url: '/:id/modulos/:idModule/quiz',
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
    .state('courses.answers', {
      url: '/:idModule/quiz/:id',
      data: {
        title: 'Pregunta'
      },
      views: {
        'content@courses': {
          templateUrl: 'admin/courses/question.html',
          controller: 'QuestionController'
        }
      }
    })
    .state('courses.categoryedit', {
      url: '/categorias/:id',
      data: {
        title: 'Editar Categoría'
      },
      views: {
        'content@courses': {
          templateUrl: 'admin/courses/category-edit.html',
          controller: 'CategoryEditController'
        }
      }
    })
    .state('courses.certificates', {
      url: '/certificados',
      data: {
        title: 'Certificados'
      },
      views: {
        'content@courses': {
          templateUrl: 'admin/courses/certificates.html',
          controller: 'CertificatesController'
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
    .state('user.students', {
      url: '/lista',
      data: {
        title: 'Lista de Alumnos'
      },
      views: {
        'content@user': {
          templateUrl: 'admin/user/list.html',
          controller: 'UsersListController'
        }
      }
    })
    .state('user.ambassadors', {
      url: '/embajadores',
      data: {
        title: 'Lista de Embajadores'
      },
      views: {
        'content@user': {
          templateUrl: 'admin/user/ambassadors.html',
          controller: 'AmbassadorsListController'
        }
      }
    })
    .state('user.instructors', {
      url: '/lista/instructores',
      data: {
        title: 'Lista de Instructores'
      },
      views: {
        'content@user': {
          templateUrl: 'admin/user/instructors.html',
          controller: 'InstructorsController'
        }
      }
    })
    .state('user.admins', {
      url: '/lista/administradores',
      data: {
        title: 'Lista de Administradores'
      },
      views: {
        'content@user': {
          templateUrl: 'admin/user/admins.html',
          controller: 'AdminsController'
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
    .state('user.edit', {
      url: '/edicion/:nickname',
      data: {
        title: 'Datos'
      },
      views: {
        'content@user': {
          templateUrl: 'admin/user/edit.html',
          controller: 'UserEditController'
        }
      }
    })
    .state('user.ambassadorslist', {
      url: '/:nickname/lista',
      data: {
        title: 'Embajadores'
      },
      views: {
        'content@user': {
          templateUrl: 'admin/user/ambassadorslist.html',
          controller: 'UserAmbassadorsController'
        }
      }
    })
    .state('user.level', {
      url: '/:nickname/lista/:level',
      data: {
        title: 'Embajadores'
      },
      views: {
        'content@user': {
          templateUrl: 'campus/ambassador/list-level.html',
          controller: 'UserLevelController'
        }
      }
    })


    // Finanzas
    .state('financial', {
      url: '/admin/finanzas',
      abstract: true,
      data: {
        'needAuth': true,
        'title': 'Finanzas'
      },
      views: {
        dashboard: {
          templateUrl: 'admin/index.html'
        }
      }
    })
    .state('financial.pending', {
      url: '/pendientes',
      data: {
        title: 'Pendientes de pago'
      },
      views: {
        'content@financial': {
          templateUrl: 'admin/financial/pending.html',
          controller: 'PendingController'
        }
      }
    })
    .state('financial.income', {
      url: '/ingresos',
      data: {
        title: 'Ingresos'
      },
      views: {
        'content@financial': {
          templateUrl: 'admin/financial/income.html',
          controller: 'IncomeController'
        }
      }
    })
    .state('financial.outcome', {
      url: '/egresos',
      data: {
        title: 'Egresos'
      },
      views: {
        'content@financial': {
          templateUrl: 'admin/financial/outcome.html',
          controller: 'OutcomeController'
        }
      }
    })
    .state('financial.contingency', {
      url: '/contingencia',
      data: {
        title: 'Contingencia'
      },
      views: {
        'content@financial': {
          templateUrl: 'admin/financial/contingency.html',
          controller: 'ContingencyController'
        }
      }
    })

    // Sale
    .state('others', {
      url: '/admin/otros',
      abstract: true,
      data: {
        'needAuth': true,
        'title': 'Otros'
      },
      views: {
        dashboard: {
          templateUrl: 'admin/index.html'
        }
      }
    })
    .state('others.welcomeimage', {
      url: '/imagen-bienvenida',
      data: {
        title: 'Imagen de inicio'
      },
      views: {
        'content@others': {
          templateUrl: 'admin/others/welcome-image.html',
          controller: 'WelcomeImageController'
        }
      }
    })


  // default fall back route
  $urlRouterProvider.otherwise('/admin/inicio');

  // enable HTML5 Mode for SEO
  $locationProvider.html5Mode(true);
}