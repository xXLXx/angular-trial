/**
 * Angular Controller: ClientController
 *
 * Client Controller
 */
(function() {
    
    'use strict';

    angular
        .module('lmr-trial')
        .controller('ContactController', ContactController);

    function ContactController($rootScope, $scope, $state, $stateParams, ContactService, NgTableParams) {
        var vm = this;
            vm.family_lists = [];
            vm.contact_count = 0;
    // ===================================== //
    //          FUNCTION REFERENCE           //
    // ===================================== //
    
       
    // ===================================== //
    //    MODAL(S) FUNCTION REFERENCE        //
    // ===================================== //   
        vm.ShowAddModalContact = ShowAddModalContact;
        vm.ShowModalClientInfo = ShowModalClientInfo;

        $rootScope.$on('MODAL_ADD_CONTACT_OK', _OnAddContactModalOk);
        

    // ===================================== //
    //         FUNCTION DEFINITION(S)        //
    // ===================================== //
        
        function _init () {
            var tmp = [];
            ContactService.RetrieveListFamilyData().then(function(response) {
                vm.contact_count = response.TotalNumber;
                angular.forEach(response.FamilyList, function(value, key) {
                   tmp.push(value);
                });
            });

            vm.family_lists = tmp;    

            // ContactService.RetrieveListMyContact().then(function(response) {
            //     console.log(response);
            // });
            if($stateParams.id) {
                ContactService.RetrieveContactSummary($stateParams.id).then(function(response) {
                    console.log(response);
                });
            }
        }

        function ShowAddModalContact () {
            $rootScope.$broadcast('$stateShowAddContact');
        }

        function ShowModalClientInfo (family_info) {
            $rootScope.$broadcast('$stateShowShowClientInfo', family_info);
        }

        function _OnAddContactModalOk (e, id, contact) {
            var data = [{
                'Role' : contact.role,
                'LastName': contact.last_name,
                'FirstName': contact.first_name,
                'MiddleName': contact.middle_name,
                'PreferredName': contact.preferred_name,
                'Title': contact.title,
                'Gender': contact.gender,
                'Employment': [{}],
                'SmokerStatus': false,
                'Phone' : [],
                'Address': [],
                'Email': []
            }];

            ContactService.AddConctactSet(data).then(function(response) {});
        }

      
        

        _init();
    }
    
})();