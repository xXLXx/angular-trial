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
            vm.summary_info = [];
            vm.adult_lists = [];
            vm.child_lists = [];
    // ===================================== //
    //          FUNCTION REFERENCE           //
    // ===================================== //
    
       
    // ===================================== //
    //    MODAL(S) FUNCTION REFERENCE        //
    // ===================================== //   
        vm.ShowAddModalContact = ShowAddModalContact;
        vm.ShowModalClientInfo = ShowModalClientInfo;
        vm.ShowInfo = ShowInfo;
        vm.OpenTab = OpenTab;

        $rootScope.$on('MODAL_ADD_CONTACT_OK', _OnAddContactModalOk);
        

    // ===================================== //
    //         FUNCTION DEFINITION(S)        //
    // ===================================== //
        
        function _init () {
            var tmp = [];
            ContactService.RetrieveListFamilyData().then(function(response) {
                vm.contact_count = response.TotalNumber;
                angular.forEach(response.FamilyList, function(value, key) {
                    if($stateParams.id) {
                        if (value.FamilyID == $stateParams.id) {
                             $rootScope.FamilyName = value.FamilyFullName;
                        }
                    } 
                   tmp.push(value);
                });
            });
            
            vm.family_lists = tmp;

            var tmp_summary = []; 
            if($stateParams.id) {
                var tmp_adult = [];
                var tmp_child = [];
                ContactService.RetrieveContactSummary($stateParams.id).then(function(summary) {

                    console.log(summary);
                    angular.forEach(summary, function(value, key) {
                         if (value.Role == 'Adult') {
                            tmp_adult.push(value);
                         } else if (value.Role == 'Child') {
                            tmp_child.push(value);
                         }

                    });
                    vm.child_lists = tmp_child;
                    vm.adult_lists = tmp_adult;
                });


                ContactService.RetrieveAddressInfo($stateParams.id).then(function(address) {
                    console.log(address);
                });

                // console.log(vm.summary_info);
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

        function ShowInfo (family_info) {
            $rootScope.FamilyName = family_info.FamilyFullName;
        }

        function OpenTab (e) {
            e.preventDefault();
            $(e.target).tab('show');
        }
        

        _init();
    }
    
})();