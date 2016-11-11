angular.module('TestFrontend')
    .directive('taskList', function() {
        return {
            restrict: 'E',
            templateUrl: 'views/tasks.tpl.html',
            controller: TasksController
        };
    });

function TasksController($scope, $stateParams, TaskService) {

    TaskService.setProjectId($stateParams.projectId);

    $scope.tasks = TaskService.fetchTasks();
    $scope.dateTasks = TaskService.getByDateTasks();
    $scope.loadMoreTasks = TaskService.loadMoreTasks;
    $scope.isNoAll = true;
    $scope.countLoading = 3;

    $scope.compliteTask = function (idTask) {
        TaskService.compliteTask(idTask);
    };
}

//Filter does not correctly work because start endless watchers
//
//app.filter('sortByDate', function ($filter) {
//    return function (items) {
//        var oldDateKey;
//        var returnArr = [];
//        var yesterday = new Date();
//        var tomorrow = new Date();
//
//        yesterday.setDate(tomorrow.getDate() - 1);
//        tomorrow.setDate(tomorrow.getDate() + 1);
//
//        angular.forEach(items, function (item){
//            var taskDate = new Date(item.created_at);
//            var dateKey = $filter('date')(taskDate, 'EEEE') + ' (' + $filter('date')(taskDate, 'dd.MM.yyyy') + ')';
//
//            if($filter('date')(new Date(), 'dd.MM.yyyy') == $filter('date')(taskDate, 'dd.MM.yyyy'))
//                dateKey = "Today";
//            else if($filter('date')(yesterday, 'dd.MM.yyyy') == $filter('date')(taskDate, 'dd.MM.yyyy'))
//                dateKey = "Yesterday";
//            else if($filter('date')(tomorrow, 'dd.MM.yyyy') == $filter('date')(taskDate, 'dd.MM.yyyy'))
//                dateKey = "Tomorrow";
//
//            if(item.title != null){
//                if(dateKey == oldDateKey){
//                    returnArr[0].items.unshift(item);
//                } else {
//                    oldDateKey = dateKey;
//                    returnArr.unshift({
//                        text_date: dateKey,
//                        items: [item]
//                    });
//                }
//            }
//        });
//        items.date = returnArr;
//
//        return items;
//    };
//});