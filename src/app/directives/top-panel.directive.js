angular.module('TestFrontend')
    .directive('topPanel', function($window) {
        return {
            restrict: 'E',
            templateUrl: 'views/top_panel.tpl.html',
            link: function(scope) {
                scope.openMenu = function($mdOpenMenu, ev) {
                    originatorEv = ev;
                    $mdOpenMenu(ev);
                };
                scope.setSearchFocus = function () {
                    $window.document.getElementById('search-input').focus();
                };
            },
            controller: TopPanelController
        };
    });

function TopPanelController($scope, $state, $stateParams, ProjectService, TaskService) {

    $scope.deteteProject = function () {
        ProjectService.deleteProject($stateParams.projectId);
        $state.go('main');
    };
    
    $scope.searchTasks = function () {
        TaskService.condition_keywords = $scope.searchText;
        TaskService.fetchTasks($stateParams.projectId);
    };

    $scope.$watch('searchText', function() {
        $scope.searchTasks();
    });
}