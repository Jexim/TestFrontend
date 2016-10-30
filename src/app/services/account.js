app.service('Account', function($http, $log) {

    this.createNewUser = function(callback) {
        $http({
            method: 'POST',
            url: 'https://api-test-task.decodeapps.io/signup'
        }).then(function successCallback(response) {
            callback(response.data);
        }, function errorCallback() {
            $log.error('API createNewUser error');
        });
    },

    this.checkSession = function (session ,callback) {
        $http({
            method: 'GET',
            url: 'https://api-test-task.decodeapps.io/session',
            params: {session: session},
        }).then(function successCallback(response) {
            callback(response);
        }, function errorCallback() {
            $log.error('API checkSession error');
        });
    },

    this.fetchAccount = function(session, callback) {
        $http({
            method: 'GET',
            url: 'https://api-test-task.decodeapps.io/account',
            params: {session: session},
        }).then(function successCallback(response) {
            callback(response.data.Account);
        }, function errorCallback() {
            $log.error('API fetchAccount error');
        });
    }
});