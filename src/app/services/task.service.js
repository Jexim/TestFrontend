angular.module('TestFrontend')
    .service('TaskService', function($http, $log, $filter, Restangular, AccountService, ProjectService) {

        var self = this,
            projectId = null,
            task = {
                items: [],
                total_count: 0
            },
            dates = {
                items: []
            },
            loadedCount = null;

        this.condition_keywords = null;

        this.setProjectId = function (id) {
            projectId = id;
            loadedCount = 10;
            self.condition_keywords = null;
        };

        this.fetchTasks = function () {
            if(projectId != null){
                Restangular.one('tasks').get({
                        session: AccountService.getToken(),
                        project_id: projectId,
                        paging_size: loadedCount,
                        paging_offset: 0,
                        condition_keywords: self.condition_keywords
                    })
                    .then(function(response) {
                        task.total_count = response.total_count;
                        task.items = taskSortById(response.tasks);
                        self.sortByDateTasks();
                    }, function() {
                        $log.error('TaskService API fetchTasks error');
                    });

                return task;
            }
        };

        this.loadMoreTasks = function (count) {
            if(loadedCount >= task.total_count)
                return false;

            if(count + loadedCount > task.total_count) {
                loadedCount = task.total_count;
            } else {
                loadedCount += count;
            }
            self.fetchTasks();

            return true;
        };

        this.fetchTask = function (task_id) {
            if(typeof task.items[task_id] == 'undefined') {
                Restangular.one('tasks').one('task').get({
                        session: AccountService.getToken(),
                        task_id: task_id
                    })
                    .then(function(response) {
                        task.items[response.Task.id] = response.Task;
                    }, function() {
                        $log.error('TaskService API fetchTasks error');
                    });
            }
            return {
                item: task.items[task_id]
            }
        };

        this.createTask = function (title, description) {
            Restangular.one('tasks').all('task').post({
                    session: AccountService.getToken(),
                    Project: {
                        id: projectId
                    },
                    Task: {
                        title: title,
                        description: description
                    }})
                .then(function(response) {
                    //This code not working correctly because create data in server not same in local
                    //task.items[response.Task.id] = {
                    //    created_at: $filter('date')(new Date(), 'yyyy-MM-dd hh:mm:ss'),
                    //    id: response.Task.id,
                    //    title: title,
                    //    description: description
                    //};
                    //task.total_count++;
                    //loadedCount++;
                    self.fetchTasks();
                    self.sortByDateTasks();
                    ProjectService.addTaskCount(projectId, 1);
                }, function () {
                    $log.error('TaskService API createTask error');
                });
        };

        this.updateTask = function (id, title, description) {
            Restangular.one('tasks').all('task').post({
                    session: AccountService.getToken(),
                    Task: {
                        id: id,
                        title: title,
                        description: description
                    }
                })
                .then(function() {
                    task.items[id].title = title;
                    task.items[id].description = description;
                }, function () {
                    $log.error('TaskService API updateTask error');
                });
        };

        this.deleteTask = function (id) {
            Restangular.one('tasks').all('task').remove({
                    session: AccountService.getToken(),
                    task_id: id
                })
                .then(function() {
                    delete task.items[id];
                    self.sortByDateTasks();
                }, function () {
                    $log.error('TaskService API deleteTask error');
                });
        };

        this.compliteTask = function (id) {
            Restangular.one('tasks').all('task').post({
                    session: AccountService.getToken(),
                    Task: {
                        id: id
                    }
                })
                .then(function() {
                    delete task.items[id];
                    self.sortByDateTasks();
                }, function () {
                    $log.error('TaskService API compliteTask error');
                });
        };

        //Make copy tasks object and group by date for view
        this.sortByDateTasks = function () {
            var oldDateKey;
            var yesterday = new Date();
            var tomorrow = new Date();

            yesterday.setDate(tomorrow.getDate() - 1);
            tomorrow.setDate(tomorrow.getDate() + 1);

            dates.items = [];

            angular.forEach(task.items, function (item){
                var taskDate = new Date(item.created_at);
                var dateKey = $filter('date')(taskDate, 'EEEE') + ' (' + $filter('date')(taskDate, 'dd.MM.yyyy') + ')';

                if($filter('date')(new Date(), 'dd.MM.yyyy') == $filter('date')(taskDate, 'dd.MM.yyyy'))
                    dateKey = "Today";
                else if($filter('date')(yesterday, 'dd.MM.yyyy') == $filter('date')(taskDate, 'dd.MM.yyyy'))
                    dateKey = "Yesterday";
                else if($filter('date')(tomorrow, 'dd.MM.yyyy') == $filter('date')(taskDate, 'dd.MM.yyyy'))
                    dateKey = "Tomorrow";

                if(item.title != null){
                    if(dateKey == oldDateKey){
                        dates.items[0].items.unshift(item);
                    } else {
                        oldDateKey = dateKey;
                        dates.items.unshift({
                            text_date: dateKey,
                            items: [item]
                        });
                    }
                }
            });
        };

        this.getByDateTasks = function () {
            return dates;
        };

        function taskSortById(tasks) {
            var returnObj = {};

            tasks.forEach(function(item){
                returnObj[item.Task.id] = item.Task;
            });

            return returnObj;
        }
    });