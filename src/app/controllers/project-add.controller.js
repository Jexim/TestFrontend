angular.module('TestFrontend')
    .controller('AddProjectController', function ($scope, $mdSidenav, $state, ProjectService){

        $mdSidenav('right').open();

        $scope.addProject = function() {
            ProjectService.createProject($scope.title);
            $mdSidenav('right').close();
            $state.go('main');
        };
    });