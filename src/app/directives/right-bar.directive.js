angular.module('TestFrontend')
    .directive('rightBar', function($window, $state, $stateParams, $mdSidenav) {
        return {
            restrict: 'E',
            templateUrl: 'views/right-bar.tpl.html',
            link: function(scope) {
                scope.hideBar = function() {
                    $mdSidenav('right').close();
                };
                $mdSidenav('right').onClose(function () {
                    if($stateParams.projectId != undefined)
                        $state.go('projects',  {projectId: $stateParams.projectId});
                    else
                        $state.go('main');
                });
            }
        };
    });