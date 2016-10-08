/**
 * Angular Directive: lsidebar
 *
 * Left Sidebar Directive
 */
(function() {
    
    'use strict';

    angular
        .module('lmr-trial')
        .directive('lsidebar', lsidebar);

    function lsidebar($rootScope, $state, NG_PATH)  {

        var directive = {
            restrict: 'E',
            templateUrl: NG_PATH.DIRECTIVES + 'lsidebar/template.html',
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
        function _Link($scope, element, attrs) {
            
            console.log($state);
            // $rootScope.currentState == $state.current.name;
        }

    }
    
})();