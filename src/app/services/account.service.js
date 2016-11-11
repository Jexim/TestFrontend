angular.module('TestFrontend')
    .service('AccountService', function($cookies, $log, Restangular) {

        var self = this,
            token = $cookies.get('userToken')
        this.user = {
            data: {}
        };

        this.login = function() {
            if(typeof token != 'string'){
                return loginNewUser();
            } else {
                return loginByToken(token);
            }
        };

        this.getToken = function() {
            return token;
        };

        function loginNewUser() {
            return Restangular.one('signup').post()
                .then(
                    function(response) {
                        token = response.session;
                        $cookies.put('userToken', response.session);
                        getUserData();
                    }, function() {
                        $log.error('User API loginNewUser error');
                    }
                );
        }

        function loginByToken(token) {
            return Restangular.one('session').get({
                    session: token
                })
                .then(
                    function() {
                        getUserData();
                    }, function() {
                        $cookies.remove('userToken');
                        token = null;
                        self.user.data = {};
                        $log.error('User API loginByToken error');
                    }
                );
        }

        function getUserData() {
            return Restangular.one('account').get({
                    session: token
                })
                .then(
                    function(response) {
                        self.user.data = response.Account;
                    }, function() {
                        $log.error('User API getUserData error');
                    }
                );
        }
    });