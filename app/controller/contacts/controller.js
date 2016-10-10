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

    function ContactController($rootScope, $scope, $state, $stateParams, ContactService, NgTableParams, $compile) {
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
            vm.letters = [];
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
        vm.SelectContact = SelectContact;
        vm.EditContact = EditContact;
        vm.DeleteContact = DeleteContact;

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

                setTimeout(function () {
                    $('.contacts-main table tbody tr:first-child td').each(function (idx) {
                        $('.contacts-main table th').eq(idx).width($(this).width() + 'px');
                    });

                    window.perfectScrollbarHandler();
                }, 1000);
            });
            $scope.$watch($stateParams.id, function () {
                $('.breadcrumb li:first-child a').prepend('<i class="fa fa-phone-square"></i>')
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

            _setLetters();

            $('[data-toggle="tooltip"]').tooltip();
        }

        function _setLetters () {
            var firstLetter = 'A';
            for (var x = 0; x < 26; x++) {
                vm.letters.push(String.fromCharCode(firstLetter.charCodeAt(0) + x));
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

        function ShowInfo (e, family_info, force) {
            if (!family_info) {
                family_info = vm.family_lists[$(e.currentTarget).data('index')];
            }

            if (window.isMobile() && !force) {
                var $ele = $(e.currentTarget);
                if ($ele.hasClass('detailed')) {
                    $ele.removeClass('detailed').find('+ tr').remove();
                } else {
                    $ele.addClass('detailed').after('<tr><td class="quick-details-holder">' + $ele.find('.quick-details').html() + '</td></tr>');
                    $compile($ele.find('+ tr > .quick-details-holder > button'))($scope);
                }
            } else {
                $rootScope.FamilyName = family_info.FamilyFullName;
                $state.go('contacts.summary', {id: family_info.FamilyID});
            }
        }

        function SelectContact (e) {
            var $ele = $(e.currentTarget).find('[type="checkbox"]'); 
            e.stopPropagation();
            console.log($ele);
            $ele.prop('checked', !$ele.prop('checked'));
        }

        function OpenTab (e) {
            console.log(e);
            e.preventDefault();
            $(e.target).tab('show');
        }

        function EditContact (e) {
            e.stopPropagation();
        }

        function DeleteContact (e) {
            e.stopPropagation();
        }
        

        _init();

    }
    
})();