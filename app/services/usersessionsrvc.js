/**
 * UserSession Service: UserSession
 *
 * UserSession controller service.
 */
(function () {

    'use strict';

    angular.module('lmr-trial').service('UserSession', UserSession);

    function UserSession(
                $http, 
                $q,  
                $location,
                HttpService, 
                $rootScope, 
                $timeout, 
                $cookieStore,
                LMR_API, 
                CONTACT, 
                COOKIE,
                APP_PATH) {

        var vm = this;        
        vm.IsSet =  IsSet;
        vm.Set = Set;
        vm.Check = Check;

        // ===================================== //
        //         FUNCTION DEFINITION(S)        //
        // ===================================== //

        /**
         * Access: Public 
         * Function: IsSet
         *
         * Check if user is logged.
         *
         * Return:
         * 
         *     (Boolean) - Boolean flag if a user has logged in or not.
         */
        function IsSet() {

            // if (typeof $rootScope.user === 'undefined') {
            //     return false;
            // }

            return false;
        }


        function Set (token) {
            $rootScope.token = token;
            $cookieStore.put(COOKIE.AUTH_TOKEN, token);

            $timeout(function() {
                $location.path(APP_PATH.BASE_URL);            
            }, 800);
        }

          /**
         * Access: Public 
         * Function: Check
         *
         * Check if there's an existing cookie for user session,
         * then automatically login, else do nothing.
         */
        function Check() {
            if (typeof $cookieStore.get(COOKIE.AUTH_TOKEN) !== 'undefined') {                
                $rootScope.token = $cookieStore.get(COOKIE.AUTH_TOKEN);
                HttpService.SetAuthorizationHeader($rootScope.token);
            }

            var redirect = ($rootScope.token) ? APP_PATH.BASE_URL : APP_PATH.LOGIN_URL;
            if (redirect === APP_PATH.BASE_URL && $location.path().length > 2)
                return;
                
            $timeout(function() {
                $location.path(redirect);            
            }, 10);
        }
        
    }

} )( );
