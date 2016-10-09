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
            vm.contact_count = 0;
            vm.isChecked = false;
            vm.family_lists = [];
            vm.adult_lists = [];
            vm.child_lists = [];
            vm.loan_lists = [];
            vm.tag_lists = [];
            vm.note_lists = [];
            vm.client_lists = [];
            vm.relationship_lists = [],
            vm.address_lists = [],
            vm.home_address = [];
    // ===================================== //
    //          FUNCTION REFERENCE           //
    // ===================================== //
    
       
    // ===================================== //
    //    MODAL(S) FUNCTION REFERENCE        //
    // ===================================== //   
        vm.ShowAddModalContact = ShowAddModalContact;
        vm.ShowModalAddRelationship = ShowModalAddRelationship;
        vm.ShowInfo = ShowInfo;
        vm.OpenTab = OpenTab;

        $rootScope.$on('MODAL_ADD_CONTACT_OK', _OnAddContactModalOk);
        $rootScope.$on('MODAL_ADD_RELATIONSHIP_OK', _OnAddRelationshipModalOk);
        

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

                vm.family_lists = tmp;
            });

            if($stateParams.id) {
                var tmp_adults = [], 
                    tmp_childs = [], 
                    tmp_loans = [], 
                    tmp_tags = [],
                    tmp_notes = [],
                    tmp_clients = [],
                    tmp_address = [];


                ContactService.RetrieveContactSummary($stateParams.id).then(function(summary) {
                    angular.forEach(summary, function(value, key) {
                         tmp_clients.push(value);
                         if (value.Role == 'Adult') {
                            tmp_adults.push(value);
                         } else if (value.Role == 'Child') {
                            tmp_childs.push(value);
                         }

                    });
                    vm.child_lists = tmp_childs;
                    vm.adult_lists = tmp_adults;
                    vm.client_lists = tmp_clients;
                });


                ContactService.RetrieveAddressInfo($stateParams.id).then(function(address) {
                    angular.forEach(address, function(value, key) {
                        tmp_address.push(value);
                        if (value.Type != 'Mail') {
                            vm.isChecked = true;
                        }
                        
                        if (vm.isChecked) {
                            tmp_address.push({
                                'Type': 'Mail',
                                'formatted_address': value.formatted_address
                            })
                        } 

                    });
                    vm.address_lists = tmp_address;
                    
                });

                ContactService.RetrieveLoanList($stateParams.id).then(function(loans) {
                    angular.forEach(loans, function(value, key) {
                         tmp_loans.push(value);
                    });
                    vm.loan_lists = tmp_loans;
                });

                ContactService.RetrieveTaggedList($stateParams.id).then(function(tags) {
                    angular.forEach(tags, function(value, key) {
                         tmp_tags.push(value);
                    });
                    vm.tag_lists = tmp_tags;
                });

                ContactService.RetrieveNoteList($stateParams.id).then(function(notes) {
                    angular.forEach(notes, function(value, key) {
                         tmp_notes.push(value);
                    });
                    vm.note_lists = tmp_notes;
                });

                _LoadClientInit($stateParams.id);

            }
        }

        function _LoadClientInit(familyid) {
            var tmp_relationship = [],
                tmp_home_address = [];
            ContactService.RetrieveRelationshipList(familyid).then(function(relationships) {
                angular.forEach(relationships, function(value, key) {
                    angular.forEach(value.Phone, function(phone, key) {
                        if (phone.Type == 'Mobile') {
                            value.Mobile = phone.Number;
                        } else if (phone.Type == 'Work') {
                            value.Work = phone.Number;
                        }
                    });
                    tmp_relationship.push(value);
                    vm.relationship_lists = tmp_relationship;
                });
            });

            ContactService.RetrieveContactFamilyInfo(familyid).then(function(contactinfo) {
               
                ContactService.RetrieveAdviserName().then(function(adviser) {
                    if (contactinfo.BrokerID == adviser.BrokerId) {
                        contactinfo.BrokerFullName = adviser.FullName;
                    }

                });


                tmp_home_address = contactinfo;
                vm.home_address = tmp_home_address;
                
                console.log(vm.home_address);
            });
        }

        function ShowAddModalContact () {
            $rootScope.$broadcast('$stateShowAddContact');
        }

        function ShowModalAddRelationship () {
            $rootScope.$broadcast('$stateShowAddRelationship');
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

        function _OnAddRelationshipModalOk (e, id, relationship) {
            var data = {
                  "FamilyID": $stateParams.id,
                  "orgs": [
                    {
                      "Name": "string",
                      "Firm": "string",
                      "OrganisationCategory": "string",
                      "OrganisationType": "string",
                      "OrganisationTypeOther": "string",
                      "Description": "string",
                      "IsMainOrganisation": true,
                      "Phone": [],
                      "Address": [],
                      "Email": [],
                      "Notes": "string",
                      "PersonId": "string"
                    }
                  ]
                };

            ContactService.AddRelationshipSet(data).then(function(response) {});
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