angular.module('TestFrontend')
    .controller('AddTaskController', function ($scope, $stateParams, $state, $mdSidenav, TaskService){

        $mdSidenav('right').open();

        $scope.addTask = function() {
            TaskService.createTask($scope.title, $scope.description);
            $state.go('projects', {projectId: $stateParams.projectId});
            $mdSidenav('right').close();
        };
    });