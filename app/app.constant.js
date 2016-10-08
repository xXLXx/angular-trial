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
        	GET_PER_FAMILY : 'contacts/MyContactGet',
        	ADD_CONTACT    : 'contacts/ContactSet',
            SUMMARY        : 'contacts/ClientInformGet'
        }) 
        .constant('COOKIE', {
            AUTH_TOKEN: 'auth_token'
        });
})();