(function() {

    'use strict';

    angular
        .module('lmr-trial')
        .config(AppConfig);

    function AppConfig($stateProvider, $urlRouterProvider, $locationProvider, NG_PATH, $breadcrumbProvider) {

        /**
         * Default Routes
         */
        $urlRouterProvider
            .when('', '/')
            .when('/', '/')
            .otherwise('/page-not-found');

        /**
         * Application Routes
         *
         * This is where you'll define the different state/routes of your app.
         */
        $stateProvider

        // Login Route
        .state({
            name: 'login',
            url: '/login',
            templateUrl: NG_PATH.CONTROLLER + 'login/view.html',
            controller: 'LoginController as vm',
            resolve: {
                Session: _CheckSession
            },
            ncyBreadcrumb: {
                skip: true
            }
        })

        // Contact Route
        
        .state({
            name: 'contacts',
            url: '/contacts',
            abstract: true,
            controller: '',
            templateUrl: NG_PATH.CONTROLLER + 'contacts/template.html',
            // template: '<ui-view />',
            resolve: {
                Session: _CheckSession
            },
            ncyBreadcrumb: {
                skip: true
            }
        })

        .state({
            name: 'contacts.index',
            url: '',
            templateUrl: NG_PATH.CONTROLLER + 'contacts/view.html',
            controller: 'ContactController as vm',
            ncyBreadcrumb: {
                label: 'Contacts'
            }
        })

        .state({
            name: 'contacts.summary',
            url: '/:id',
            templateUrl: NG_PATH.CONTROLLER + 'contacts/summary.html',
            controller: 'ContactController as vm',
             ncyBreadcrumb: {
                label: '{{ FamilyName }}',
                parent: 'contacts.index'
            }
        });

        function _CheckSession($timeout, $location, UserSession) {
            console.log('dd');
        }

    }

})();
