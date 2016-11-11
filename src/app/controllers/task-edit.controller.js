angular.module('TestFrontend')
    .controller('EditTaskController', function ($scope, $stateParams, $state, $mdSidenav, TaskService){

        $scope.task = TaskService.fetchTask($stateParams.taskId);
        $scope.title = $scope.task.item.title;
        $scope.description = $scope.task.item.description;

        $scope.editTask = function() {
            TaskService.updateTask($stateParams.taskId, $scope.title, $scope.description);
            $state.go('projects.task', {taskId: $stateParams.taskId});
        };
    });