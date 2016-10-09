/**
 * Angular Service: Auth
 *
 * User Session Service.
 */
(function() {
    
    'use strict';
    angular
        .module('lmr-trial')
        .factory('Auth', Auth);
    
    function Auth($http, $q, $rootScope, LMR_API, AUTH) {
        var service = {
            Login: Login,
            Logout : Logout
        };



        return service;
        
    // ===================================== //
    //          FUNCTION DEFINITIONS         //
    // ===================================== //

        /**
         * Access: Public
         * Function: Login
         *
         * Login Authentication
         *
         * Parameter(s):
         * 
         *     (Object) loginCred - Submitted login credentials
         *
         * Return:
         * 
         *     (Object) - The user information
         */
        function Login(loginCred) {
            var d = $q.defer();
            
            $http({
                method: 'POST',
                url: LMR_API.URL + AUTH.LOGIN,
                headers: {
                    'Content-Type': 'application/json',
                },
                data: JSON.stringify(loginCred),
            }).success(function(data) {
                d.resolve(data);

            }).error(function(data, status) {
                d.reject({
                    data: data,
                    status: status
                });

            });

            return d.promise;

        }

        function Logout() {
            var d = $q.defer();
            
            $http({
                method: 'POST',
                url: LMR_API.URL + AUTH.LOGIN,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : 'Bearer' + $rootScope.token
                }
            }).success(function(response) {
                d.resolve(response);
            }).error(function(status) {
                d.reject(status);
            });

            return d.promise;

        }

    }

})();