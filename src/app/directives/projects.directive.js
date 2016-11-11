angular.module('TestFrontend')
    .directive('projectsList', function() {
        return {
            restrict: 'E',
            templateUrl: 'views/projects.tpl.html',
            controller: ProjectsController
        };
    });

function ProjectsController($scope, $stateParams, ProjectService){
    $scope.projects = ProjectService.fetchProjects();
    $scope.selectedProject = $stateParams;
}