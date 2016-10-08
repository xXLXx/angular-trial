/**
 * Angular Service: HttpService
 *
 * Service for setting authorization headers for protected api requests.
 *
 */
(function() {

    'use strict';

    angular
        .module('lmr-trial')
        .service('HttpService', HttpService);

    function HttpService($http) {

        var vm = this;

        vm.SetAuthorizationHeader = SetAuthorizationHeader;
        vm.RemoveAuthHeaders = RemoveAuthHeaders;

        // Set the authorization header token
        function SetAuthorizationHeader(token) {
            $http.defaults.headers.common.Authorization = 'Bearer ' + token;
        }

        function RemoveAuthHeaders() {
            $http.defaults.headers.common.Authorization = '';
        }

    }

})();
