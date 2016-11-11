angular.module('TestFrontend')
    .config(function($stateProvider, $urlRouterProvider, RestangularProvider) {

        RestangularProvider.setBaseUrl("https://api-test-task.decodeapps.io");
        $urlRouterProvider.otherwise('/');

        $stateProvider.state({
            name: 'main',
            url: '/',
            views: {
                content: {
                    templateUrl: 'views/select_project.tpl.html',
                }
            }
        });

        $stateProvider.state({
            name: 'projects',
            url: '/projects/:projectId',
            views: {
                content: {
                    template: '<top-panel class="top_panel"></top-panel><task-list></task-list>',
                }
            },
            resolve: {
                user: function(AccountService) {
                    return AccountService.login();
                }
            }
        });

        $stateProvider.state({
            name: 'projectAdd',
            url: '/project/add',
            views: {
                content: {
                    templateUrl: 'views/select_project.tpl.html',
                },
                'rightBar': {
                    templateUrl: 'views/project_add.tpl.html',
                    controller: 'AddProjectController',
                }
            }
        });

        $stateProvider.state({
            name: 'projects.edit',
            url: '/edit',
            views: {
                'rightBar@': {
                    templateUrl: 'views/project_edit.tpl.html',
                    controller: 'EditProjectController'
                }
            }
        });

        $stateProvider.state({
            name: 'projects.task',
            url: '/tasks/:taskId',
            views: {
                'rightBar@': {
                    templateUrl: 'views/task.tpl.html',
                    controller: 'TaskController'
                }
            }
        });

        $stateProvider.state({
            name: 'projects.taskAdd',
            url: '/task/add',
            views: {
                'rightBar@': {
                    templateUrl: 'views/task_add.tpl.html',
                    controller: 'AddTaskController'
                }
            }
        });

        $stateProvider.state({
            name: 'projects.task.edit',
            url: '/edit',
            views: {
                'rightBar@': {
                    templateUrl: 'views/task_edit.tpl.html',
                    controller: 'EditTaskController'
                }
            }
        });
    });