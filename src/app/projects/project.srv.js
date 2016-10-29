app.service('Project', function($http, $log) {

    this.fetchProjects = function(session, callback) {
        $http({
            method: 'GET',
            url: 'https://api-test-task.decodeapps.io/projects',
            params: {session: session},
        }).then(function successCallback(response) {
            callback(response.data.projects);
        }, function errorCallback() {
            $log.error('API fetchProjects error');
        });
    };

    this.fetchProject = function (session , project_id, callback) {
        $http({
            method: 'GET',
            url: 'https://api-test-task.decodeapps.io/projects/project',
            params: {session: session, project_id: project_id},
        }).then(function successCallback(response) {
            callback(response);
        }, function errorCallback() {
            $log.error('API fetchProject error');
        });
    };

    this.createProject = function(session, title, callback) {
        $http({
            method: 'POST',
            url: 'https://api-test-task.decodeapps.io/projects/project',
            data: {session: session, Project: { title: title }},
        }).then(function successCallback(response) {
            callback(response.data.Account);
        }, function errorCallback() {
            $log.error('API createProject error');
        });
    };

    this.updateProject = function(session, id, title, callback) {
        $http({
            method: 'POST',
            url: 'https://api-test-task.decodeapps.io/projects/project',
            data: {session: session, Project: { id: id, title: title }},
        }).then(function successCallback(response) {
            callback(response.data.Account);
        }, function errorCallback() {
            $log.error('API updateProject error');
        });
    };

    this.deleteProject = function(session, id, callback) {
        $http({
            method: 'DELETE',
            url: 'https://api-test-task.decodeapps.io/projects/project',
            params: {session: session, project_id: id},
        }).then(function successCallback(response) {
            callback(response.data.Account);
        }, function errorCallback() {
            $log.error('API deleteProject error');
        });
    }
});