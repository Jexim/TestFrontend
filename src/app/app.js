/**
 * Created by Jexim on 19.10.16.
 */

var app = angular.module('TestFrontend', ['ngMaterial', 'ngCookies', 'infinite-scroll']);

app.controller('MainCtrl', function ($scope, $mdSidenav, $cookies, Account, Project, Task){

    $scope.loading = true;
    $scope.stepTask = 1;
    $scope.sizeTask = 10;
    $scope.isAllTasks = false;
    $scope.countTask = 0;
    $scope.project = { id: 0 };

    $scope.$watch('project.id', function() {
        $scope.isAllTasks = false;
        $scope.sizeTask = 10;
        getTasks();
    });

    $scope.$watch('search', function() {
        getTasks();
    });

    $scope.$watch('tasks', function () {
        if($scope.project.id != 0 && $scope.countTask == 0){
            $scope.content = 'views/tasks_not.tpl.html';
        }
    });

    if(typeof $cookies.get('userSessionKey') != 'string'){
        $scope.loading = true;
        Account.createNewUser(function(data){
            $cookies.put('userSessionKey', data.session);
            getAccountData();
            getProjects();
            $scope.loading = false;
        });
    } else {
        $scope.loading = true;
        Account.checkSession($cookies.get('userSessionKey'), function() {
            $scope.loading = false;
            getAccountData();
            getProjects();
            $scope.loading = false;
        });
    }

    $scope.addProjectBar = function() {
        $scope.toggleRight();
        $scope.rightBar = 'views/project_add.tpl.html';
    };

    $scope.showTaskBar = function(taskId) {
        $scope.loading = true;
        Task.fetchTask($cookies.get('userSessionKey'), taskId, function(data){
            $scope.task = data;
            $scope.toggleRight();
            $scope.rightBar = 'views/task.tpl.html';
            $scope.loading = false;
        });
    };

    $scope.addProject = function() {
        $scope.loading = true;
        Project.createProject($cookies.get('userSessionKey'), $scope.project_title, function(data) {
            getProjects();
            $scope.toggleRight();
            $scope.loading = false;
        });
    };

    $scope.deleteProject = function() {
        $scope.loading = true;
        Project.deleteProject($cookies.get('userSessionKey'), $scope.project.id, function(data) {
            getProjects();
            $scope.loading = false;
        });
    };

    $scope.editProjectBar  = function() {
        $scope.toggleRight();
        $scope.project.newTitle = $scope.project.title;
        $scope.rightBar = 'views/project_edit.tpl.html';
    };

    $scope.editProject = function() {
        $scope.loading = true;
        Project.updateProject($cookies.get('userSessionKey'), $scope.project.id, $scope.project.newTitle, function(data) {
            getProjects();
            $scope.toggleRight();
            $scope.loading = false;
        });
    };

    $scope.addTaskBar  = function() {
        $scope.newTask = null;
        $scope.toggleRight();
        $scope.rightBar = 'views/task_add.tpl.html';
    };

    $scope.addTask  = function() {
        $scope.loading = true;
        Task.createTask(
            $cookies.get('userSessionKey'),
            $scope.project.id,
            $scope.newTask.title,
            $scope.newTask.description,
            function() {
                getProjects();
                getTasks();
                $scope.toggleRight();
                $scope.loading = false;
            }
        );
    };

    $scope.editTaskBar = function() {
        $scope.rightBar = 'views/task_edit.tpl.html';
    };

    $scope.editTask = function() {
        $scope.loading = true;
        Task.updateTask(
            $cookies.get('userSessionKey'),
            $scope.task.id,
            $scope.task.title,
            $scope.task.description,
            function() {
                getTasks();
                $scope.rightBar = 'views/task.tpl.html';
                $scope.loading = false;
            }
        );
    };

    $scope.deleteTask = function() {
        $scope.loading = true;
        Task.deleteTask($cookies.get('userSessionKey'), $scope.task.id, function () {
            getProjects();
            getTasks();
            $scope.toggleRight();
            $scope.loading = false;
        });
    };

    $scope.compliteTask = function(id) {
        $scope.loading = true;
        Task.compliteTask($cookies.get('userSessionKey'), id, function() {
            getProjects();
            getTasks();
            $scope.loading = false;
        });
    };

    $scope.loadMoreTasks = function () {
        //if(!$scope.isAllTasks){
        //    $scope.sizeTask = $scope.sizeTask + $scope.stepTask;
        //    if($scope.sizeTask > $scope.countTask)
        //        $scope.sizeTask = $scope.countTask;
        //    getTasks();
        //}
    };

    $scope.openMenu = function($mdOpenMenu, ev) {
        originatorEv = ev;
        $mdOpenMenu(ev);
    };

    $scope.toggleRight = buildToggler('right');

    function getAccountData() {
        $scope.loading = true;
        Account.fetchAccount($cookies.get('userSessionKey'), function(data) {
            $scope.account = data;
            $scope.loading = false;
        });
    }

    function getProjects() {
        $scope.loading = true;
        Project.fetchProjects($cookies.get('userSessionKey'), function(data) {
            $scope.projects = data;
            $scope.loading = false;
        });
    }

    function getTasks() {
        if($scope.project.id != 0){
            $scope.loading = true;
            $scope.content = 'views/tasks.tpl.html';
            Task.fetchTasks(
                $cookies.get('userSessionKey'),
                $scope.project.id,
                $scope.sizeTask,
                0,
                $scope.search,
                function(data) {
                    $scope.tasks = data.tasks;
                    if($scope.sizeTask > data.total_count)
                        $scope.isAllTasks = true;
                    $scope.countTask = data.total_count;
                    $scope.loading = false;
                }
            );
        } else {
            $scope.content = 'views/select_project.tpl.html';
        }
    }

    function buildToggler(componentId) {
        return function() {
            $mdSidenav(componentId).toggle();
        }
    }
});