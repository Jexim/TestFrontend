angular.module('TestFrontend')
    .controller('EditProjectController', function ($scope, $mdSidenav, $stateParams, ProjectService){

        $mdSidenav('right').open();

        $scope.project = ProjectService.fetchProject($stateParams.projectId);
        $scope.title = $scope.project.title;

        $scope.editProject = function() {
            ProjectService.editProject($stateParams.projectId, $scope.title);
            $mdSidenav('right').close();
        };
    });