angular.module('TestFrontend')
    .directive('taskList', function(TaskService) {
        return {
            restrict: 'E',
            templateUrl: 'views/tasks.tpl.html',
            link: function (scope, elem) {
                var taskContainer = elem[0];

                elem.bind('scroll', function() {
                    if (taskContainer.scrollTop + taskContainer.offsetHeight >= taskContainer.scrollHeight) {
                        TaskService.loadMoreTasks(3);
                    }
                });
            },
            controller: TasksController
        };
    });

function TasksController($scope, $stateParams, TaskService) {

    TaskService.setProjectId($stateParams.projectId);

    $scope.tasks = TaskService.fetchTasks();
    $scope.dateTasks = TaskService.getByDateTasks();

    $scope.compliteTask = function (idTask) {
        TaskService.compliteTask(idTask);
    };
}