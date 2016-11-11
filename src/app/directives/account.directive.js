angular.module('TestFrontend')
    .directive('account', function(AccountService) {
        return {
            restrict: 'E',
            templateUrl: 'views/account.tpl.html',
            link: function(scope) {
                AccountService.login();
                scope.account = AccountService.user;
            }
        };
    });