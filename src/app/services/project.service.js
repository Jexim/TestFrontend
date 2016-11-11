angular.module('TestFrontend')
    .service('ProjectService', function($cookies, $log, Restangular, AccountService) {

        var projects = {};

        this.fetchProjects = function() {
            Restangular.one('projects').get({session: AccountService.getToken()})
                .then(
                    function(response) {
                        projects.items = projectIdSort(response.projects);
                    }, function() {
                        $log.error('Project API fetchProjects error');
                    }
                );

            return projects;
        };

        this.fetchProject = function (id) {
            return projects.items[id];
        };

        this.createProject = function(title) {
            Restangular.one('projects').all('project').post({
                    session: AccountService.getToken(),
                    Project: {title: title}
                })
                .then(
                    function(response) {
                        projects.items[response.Project.id] = {
                            title: title,
                            id: response.Project.id,
                            task_count: 0
                        };
                    }, function() {
                        $log.error('Project API createProject error');
                    }
                );
        };

        this.editProject = function(id, title) {
            Restangular.one('projects').all('project').post({
                    session: AccountService.getToken(),
                    Project: {
                        id: id,
                        title: title
                    }
                })
                .then(
                    function() {
                        projects.items[id].title = title;
                    }, function() {
                        $log.error('Project API updateProject error');
                    }
                );
        };

        this.deleteProject = function(id) {
            Restangular.one('projects').all('project').remove({
                    session: AccountService.getToken(),
                    project_id: id
                })
                .then(
                    function() {
                        delete projects.items[id];
                    }, function() {
                        $log.error('Project API deleteProject error');
                    }
                );
        };

        this.addTaskCount = function (id, count) {
            projects.items[id].task_count = +projects.items[id].task_count + count;
        };

        function projectIdSort(projects) {
            var returnObj = {};

            projects.forEach(function(item){
                returnObj[item.Project.id] = item.Project;
            });

            return returnObj;
        }
    });