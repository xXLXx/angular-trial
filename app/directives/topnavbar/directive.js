/**
 * Angular Directive: topnavbar
 *
 * Top Nav Bar Directive
 */
(function() {
    
    'use strict';

    angular
        .module('lmr-trial')
        .directive('topnavbar', topnavbar);

    function topnavbar($rootScope, NG_PATH, UserSession) {

        var directive = {
            restrict: 'E',
            templateUrl: NG_PATH.DIRECTIVES + 'topnavbar/template.html',
            link: _Link
        };

        return directive;

    // ===================================== //
    //            DIRECTIVE FUNCTION         //
    // ===================================== //
        
        /**
         * Access: Private
         * Function: Link
         *
         * Directive Function
         *
         * Parameter(s):
         * 
         *     (Object) $scope - Angular $scope object.
         *     (Object) element - jqLite-wrapped element that this directive matches.
         *     (Object) attrs - hash object with key-value pairs of normalized attribute names
         *                      and their corresponding attribute values.
         */
        function _Link(scope, element, attrs) {
            
           scope.ToggleMenu = ToggleMenu;
           scope.Logout = Logout;
           $rootScope.IsToggleMenuClosed = false;

           function ToggleMenu () {
                $rootScope.IsToggleMenuClosed = !$rootScope.IsToggleMenuClosed;
           } 

           function Logout() {
                UserSession.Logout();
           }

        }

    }
    
})();