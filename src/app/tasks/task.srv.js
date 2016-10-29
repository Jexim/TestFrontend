app.service('Task', function($http, $log, $filter) {

    this.fetchTasks = function(session, project_id, paging_size, paging_offset, condition_keywords, callback) {
        $http({
            method: 'GET',
            url: 'https://api-test-task.decodeapps.io/tasks',
            params: {session: session, project_id: project_id, paging_size: paging_size, paging_offset: paging_offset, condition_keywords: condition_keywords},
        }).then(function successCallback(response) {
            var date;
            var rObj = {};
            var tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() - 1);

            response.data.tasks.forEach(function(item){
                var taskDate = new Date(item.Task.created_at);

                item.Task.date = $filter('date')(taskDate, 'EEEE') + ' (' + $filter('date')(taskDate, 'dd.MM.yyyy') + ')';

                if($filter('date')(new Date(), 'dd.MM.yyyy') == $filter('date')(taskDate, 'dd.MM.yyyy'))
                    item.Task.date = "Today";
                else if($filter('date')(tomorrow, 'dd.MM.yyyy') == $filter('date')(taskDate, 'dd.MM.yyyy'))
                    item.Task.date = "Yesterday";

                if(item.Task.title != null){
                    if(item.Task.date == date){
                        rObj[date].push(item.Task);
                    } else {
                        date = item.Task.date;
                        rObj[date] = [item.Task];
                    }
                }
            });
            callback({
                tasks: rObj,
                total_count: response.data.total_count
            });
        }, function errorCallback() {
            $log.error('API fetchTasks error');
        });
    };

    this.fetchTask = function (session , task_id, callback) {
        $http({
            method: 'GET',
            url: 'https://api-test-task.decodeapps.io/tasks/task',
            params: {session: session, task_id: task_id},
        }).then(function successCallback(response) {
            callback(response.data.Task);
        }, function errorCallback() {
            $log.error('API fetchProject error');
        });
    };

    this.createTask = function(session, project_id, title, description, callback) {
        $http({
            method: 'POST',
            url: 'https://api-test-task.decodeapps.io/tasks/task',
            data: {session: session, Project: {id: project_id}, Task: {title: title, description: description}},
        }).then(function successCallback(response) {
            callback(response.data.Task);
        }, function errorCallback() {
            $log.error('API createTask error');
        });
    };

    this.updateTask = function(session, id, title, description, callback) {
        $http({
            method: 'POST',
            url: 'https://api-test-task.decodeapps.io/tasks/task',
            data: {session: session, Task: {id: id, title: title, description: description}},
        }).then(function successCallback(response) {
            callback(response.data);
        }, function errorCallback() {
            $log.error('API updateTask error');
        });
    };

    this.deleteTask = function(session, id, callback) {
        $http({
            method: 'DELETE',
            url: 'https://api-test-task.decodeapps.io/tasks/task',
            params: {session: session, task_id: id},
        }).then(function successCallback(response) {
            callback(response.data);
        }, function errorCallback() {
            $log.error('API deleteTask error');
        });
    }

    this.compliteTask = function(session, id, callback) {
        $http({
            method: 'POST',
            url: 'https://api-test-task.decodeapps.io/tasks/task',
            data: {session: session, Task: {id: id}},
        }).then(function successCallback(response) {
            callback(response.data);
        }, function errorCallback() {
            $log.error('API deleteTask error');
        });
    }
});