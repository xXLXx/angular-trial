/**
 * Contact Service: ContactService
 *
 * Contact controller service.
 */
(function () {

    'use strict';

    angular.module('lmr-trial').factory('ContactService', ContactService);

    function ContactService($http, $q, $rootScope, LMR_API, CONTACT) {

        var service = {
            RetrieveListFamilyData: RetrieveListFamilyData,
            RetrieveListMyContact: RetrieveListMyContact,
            AddConctactSet:   AddConctactSet,
            RetrieveContactSummary : RetrieveContactSummary,
            RetrieveContactInfo:  RetrieveContactInfo,
            RetrieveAddressInfo : RetrieveAddressInfo
        };

        return service;

        // ===================================== //
        //         FUNCTION DEFINITION(S)        //
        // ===================================== //

        /**
         * Access: Public
         * Function: RetrieveData
         *
         * Retrieve locations list from backend.
         *
         * Return(s):
         *
         *     (Object) - The locations list details.
         */
        function RetrieveListFamilyData() {
            var d = $q.defer();
            $http({
                method: 'GET',
                url: LMR_API.URL + CONTACT.GET_ALL_FAMILY + '?startWith=*',
                headers: {
                    'Authorization': 'Bearer ' + $rootScope.token,
                },
            }).success(function(response) {
                d.resolve(response);
            }).error(function(response) {
                d.reject(response);
            });

            return d.promise;
        }


        function RetrieveListMyContact() {
            var d = $q.defer();
            $http({
                method: 'GET',
                url: LMR_API.URL + CONTACT.GET_PER_FAMILY,
                headers: {
                    'Authorization': 'Bearer ' + $rootScope.token,
                },
            }).success(function(response) {
                d.resolve(response);
            }).error(function(response) {
                d.reject(response);
            });

            return d.promise;
        }

        function AddConctactSet(data) {
            var d = $q.defer();
            console.log(data);
            $http({
                method: 'POST',
                url: LMR_API.URL + CONTACT.ADD_CONTACT,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + $rootScope.token,
                },
                data: JSON.stringify(data)
            }).success(function(response) {
                if (!response.success) {
                    d.reject(response);
                } else {
                    d.resolve(response);
                }
            }).error(function(response) {
                d.reject(response);
            });

            return d.promise;
        }


        function RetrieveContactSummary(familyid) {
            var d = $q.defer();
            if (familyid) {
                $http({
                    method: 'GET',
                    url: LMR_API.URL + CONTACT.SUMMARY + '?familyId=' + familyid,
                    headers: {
                        'Authorization': 'Bearer ' + $rootScope.token,
                    },
                }).success(function(response) {
                    d.resolve(response);
                }).error(function(response) {
                    d.reject(response);
                });
                return d.promise;

            }
        }


        function RetrieveContactInfo (familyid) {
            var d = $q.defer();
            if (familyid) {
                $http({
                    method: 'GET',
                    url: LMR_API.URL + CONTACT.INFO + '?familyId=' + familyid,
                    headers: {
                        'Authorization': 'Bearer ' + $rootScope.token,
                    },
                }).success(function(response) {
                    d.resolve(response);
                }).error(function(response) {
                    d.reject(response);
                });
                return d.promise;

            }
        }


        function RetrieveAddressInfo (familyid) {
            var d = $q.defer();
            if (familyid) {
                $http({
                    method: 'GET',
                    url: LMR_API.URL + CONTACT.ADDRESS_INFO + '?familyId=' + familyid,
                    headers: {
                        'Authorization': 'Bearer ' + $rootScope.token,
                    },
                }).success(function(response) {
                    d.resolve(response);
                }).error(function(response) {
                    d.reject(response);
                });
                return d.promise;

            }
        }

        
    }

} )( );
