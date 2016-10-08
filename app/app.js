/**
 * Angular App: lmr-trial
 *
 * This is the app base file/kickstarter.
 * You can add necessary depencies if necessary/needed.
 *
 * CAUTION: Don't edit/remove the dependencies, unless you know what you're doing.
 */
(function() {
    'use strict';
    angular.module('lmr-trial', [
    	'ngCookies',
    	'ui.router',
    	'ngTable',
        'ncy-angular-breadcrumb'
    ])
    .run(Main);
    function Main($rootScope, $state, $stateParams, UserSession) {
    	UserSession.Check();
    	$rootScope.$state = $state;
        console.log($rootScope.$state);
    	// $rootScope.$on('$stateChangeStart', function() {
     //        $rootScope.currentState = 
     //    });
    }
})();