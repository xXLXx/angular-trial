/**
 * Angular Controller: ModalController
 *
 * Modal Controller
 */
(function() {
    
    'use strict';

    angular
        .module('lmr-trial')
        .controller('ModalController', ModalController);

    function ModalController($rootScope, $scope) {

     var vm = this;
         vm.contact = {
            'title' : '',
            'first_name': '',
            'middle_name': '',
            'last_name': '',
            'preferred_name': '',
            'role': 'Select Role',
            'birthday_reminder': false,
            'deceased': false,
            'gender': ''
         };

    /**
    *
    * Modal ID for css
    **/
    $rootScope.id_config = {
        'addContact'            : 'modal-add-contact',
        'clientInfo'            : 'modal-client-info'
    };
    
     
    // ===================================== //
    //          FUNCTION REFERENCE           //
    // ===================================== //
    
       
    // ===================================== //
    //         FUNCTION DEFINITION(S)        //
    // ===================================== //

      

    }
    
})();