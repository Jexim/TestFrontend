angular.module('TestFrontend')
    .controller('TaskController', function ($scope, $stateParams, $state, $mdSidenav, TaskService){

        $mdSidenav('right').open();

        $scope.task = TaskService.fetchTask($stateParams.taskId);

        $scope.deleteTask = function () {
            TaskService.deleteTask($stateParams.taskId);
            $state.go('projects',  {projectId: $stateParams.projectId});
            $mdSidenav('right').close();
        }
    });