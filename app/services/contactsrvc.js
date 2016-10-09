/**
 * Contact Service: ContactService
 *
 * Contact controller service.
 */
(function () {

    'use strict';

    angular.module('lmr-trial').factory('ContactService', ContactService);

    function ContactService($http, $q, $rootScope, UserSession, LMR_API, CONTACT, CLIENT) {

        var service = {
            RetrieveListFamilyData: RetrieveListFamilyData,
            AddConctactSet:   AddConctactSet,
            RetrieveContactSummary : RetrieveContactSummary,
            RetrieveLoanList:  RetrieveLoanList,
            RetrieveAddressInfo : RetrieveAddressInfo,
            RetrieveTaggedList : RetrieveTaggedList,
            RetrieveNoteList  : RetrieveNoteList,
            RetrieveClientList : RetrieveClientList,
            RetrieveRelationshipList : RetrieveRelationshipList,
            RetrieveContactFamilyInfo : RetrieveContactFamilyInfo,
            RetrieveAdviserName : RetrieveAdviserName
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
                if (response == "Your Session has expired") {
                    UserSession.Logout();
                }
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
                d.resolve(response);
            }).error(function(response) {
                if (response == "Your Session has expired") {
                    UserSession.Logout();
                }
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
                     if (response == "Your Session has expired") {
                        UserSession.Logout();
                    }
                });
                return d.promise;

            }
        }


        function RetrieveLoanList (familyid) {
            var d = $q.defer();
            if (familyid) {
                $http({
                    method: 'GET',
                    url: LMR_API.URL + CONTACT.LOAN_LIST + '?familyId=' + familyid,
                    headers: {
                        'Authorization': 'Bearer ' + $rootScope.token,
                    },
                }).success(function(response) {
                    d.resolve(response);
                }).error(function(response) {
                    if (response == "Your Session has expired") {
                        UserSession.Logout();
                    }
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
                     if (response == "Your Session has expired") {
                        UserSession.Logout();
                    }
                });
                return d.promise;

            }
        }


        function RetrieveTaggedList (familyid) {
            var d = $q.defer();
            if (familyid) {
                $http({
                    method: 'GET',
                    url: LMR_API.URL + CONTACT.TAGGED_LIST + '?familyId=' + familyid,
                    headers: {
                        'Authorization': 'Bearer ' + $rootScope.token,
                    },
                }).success(function(response) {
                    d.resolve(response);
                }).error(function(response) {
                     if (response == "Your Session has expired") {
                        UserSession.Logout();
                    }
                });
                return d.promise;

            }
        }

        function RetrieveNoteList (familyid) {
            var d = $q.defer();
            if (familyid) {
                $http({
                    method: 'GET',
                    url: LMR_API.URL + CONTACT.NOTE_LIST + '?familyId=' + familyid + '&count=*',
                    headers: {
                        'Authorization': 'Bearer ' + $rootScope.token,
                    },
                }).success(function(response) {
                    d.resolve(response);
                }).error(function(response) {
                     if (response == "Your Session has expired") {
                        UserSession.Logout();
                    }
                });
                return d.promise;

            }
        }

        function RetrieveClientList () {
            var d = $q.defer();
            if (familyid) {
                $http({
                    method: 'GET',
                    url: LMR_API.URL + CLIENT.GET_ALL,
                    headers: {
                        'Authorization': 'Bearer ' + $rootScope.token,
                    },
                }).success(function(response) {
                    d.resolve(response);
                }).error(function(response) {
                     if (response == "Your Session has expired") {
                        UserSession.Logout();
                    }
                });
                return d.promise;

            }
        }


        function RetrieveRelationshipList (familyid) {
            var d = $q.defer();
            if (familyid) {
                $http({
                    method: 'GET',
                    url: LMR_API.URL + CLIENT.RELATIONSHIP + '?familyId=' + familyid,
                    headers: {
                        'Authorization': 'Bearer ' + $rootScope.token,
                    },
                }).success(function(response) {
                    d.resolve(response);
                }).error(function(response) {
                     if (response == "Your Session has expired") {
                        UserSession.Logout();
                    }
                });
                return d.promise;

            }
        }

        function RetrieveContactFamilyInfo (familyid) {
            var d = $q.defer();
            if (familyid) {
                $http({
                    method: 'GET',
                    url: LMR_API.URL + CLIENT.INFO + '?familyId=' + familyid,
                    headers: {
                        'Authorization': 'Bearer ' + $rootScope.token,
                    },
                }).success(function(response) {
                    d.resolve(response);
                }).error(function(response) {
                     if (response == "Your Session has expired") {
                        UserSession.Logout();
                    }
                });
                return d.promise;

            }
        }

         function RetrieveAdviserName (adviserID) {
            var d = $q.defer();
            $http({
                method: 'GET',
                url: LMR_API.URL + CLIENT.ADVISER,
                headers: {
                    'Authorization': 'Bearer ' + $rootScope.token,
                },
            }).success(function(response) {
                d.resolve(response);
            }).error(function(response) {
                 if (response == "Your Session has expired") {
                    UserSession.Logout();
                }
            });
            return d.promise;
        }

    }

} )( );
