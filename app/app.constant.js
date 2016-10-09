/**
 * Angular Dependency: lmr-trial.constants
 *
 * This file contains variable constants.
 *
 * CAUTION: Don't edit/remove the constants, unless you know what you're doing.
 */
(function() {
    'use strict';
    angular.module('lmr-trial')
        .constant('APP_PATH', {
            BASE_URL: '/contacts',
            LOGIN_URL: '/login'
        })
        .constant('NG_PATH', {
            DIRECTIVES: 'app/directives/',
            FACTORIES: 'app/factories/',
            SERVICES: 'app/services/',
            CONTROLLER: 'app/controller/'
        })
        .constant('LMR_API', {
        	URL: 'https://testapi.nzfsg.co.nz/' 
        })
        .constant('AUTH', {
        	LOGIN: 'Login'
        })
        .constant('CONTACT', {
        	GET_ALL_FAMILY : 'contacts/FamilyListGet',
        	ADD_CONTACT    : 'contacts/ContactSet',
            SUMMARY        : 'contacts/ClientInformGet',
            LOAN_LIST      : 'contacts/LoanList',
            ADDRESS_INFO   : 'contacts/FamilyAddressInformGet',
            TAGGED_LIST    : 'contacts/TaggedList',
            NOTE_LIST      : 'contacts/NoteList',
            UPDATE_CONTACT : 'contacts/ContactFamilyInfoSet'       
        })
        .constant('CLIENT', {
            RELATIONSHIP    : 'contacts/RelationshipGet',
            INFO            : 'contacts/ContactFamilyInfoGet',
            ADVISER         : 'GetBrokerBasicinfo',
            ADD_RELATIONSHIP: 'contacts/RelationshipSet'
        })
        .constant('COOKIE', {
            AUTH_TOKEN: 'auth_token'
        });
})();