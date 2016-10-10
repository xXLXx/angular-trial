/**
 * Angular Directive: Modal Template
 *
 * Left Sidebar Directive
 */
(function() {
    
    'use strict';

    angular
        .module('lmr-trial')
        .directive('modalTemplate', modalTemplate);

    function modalTemplate($rootScope, $state, NG_PATH)  {

        var directive = {
            restrict: 'E',
            scope: {
                id                  : '@modalId',
                title               : '@modalTitle',
                body                : '@modalBody',
                btnOk               : '@modalBtnOk',
                size                : '@modalSize',
                showUpBtnOk         : '=',
                showBtnCancel       : '=',
                showBtnExit         : '=',
                showDownBtnOk       : '=',
                showFooter          : '=',
                contact             : '=',
                relationship        : '='
            },
            replace:    true,
            template:   '<div id="{{id}}" class="modal fade bs-example-{{ size }}">' +
                            '<div class="modal-dialog modal-dialog {{ size }}">' +
                                '<div class="modal-content">' +
                                    '<div class="modal-header">' +
                                        '<div class="col-md-6">' +
                                            '<h2 class="modal-title">{{title}}</h2>' +
                                        '</div>'+
                                        '<div class="col-md-5">' +
                                            '<button class="btn btn-primary pull-right" ng-click="OkModal()" ng-show="showUpBtnOk">{{btnOk}}</button>'+
                                        '</div>'+
                                        '<div class="col-md-1">' +
                                            '<button type="button" class="close" data-dismiss="modal" aria-label="Close" ng-show="showBtnExit"><span aria-hidden="true">&times;</span></button>' +
                                        '</div>'+
                                    '</div>'+
                                    '<div class="modal-body">'+
                                        '<ng-include src="GetTemplateUrl()"/>' +
                                    '</div>'+
                                    '<div class="modal-footer" ng-show="showFooter">' +
                                        '<div class="row text-center">' +
                                            '<button class="btn btn-dark-bluegreen" ng-click="OkModal()" ng-show="showDownBtnOk">{{btnOk}}</button>&nbsp; &nbsp;'+
                                            '<button class="btn btn-primary btn-o modal-dismiss" ng-click="CloseModal()" ng-show="showBtnCancel">Cancel</button>' +
                                        '</div>'+
                                    '</div>'+
                                '</div>' +
                            '</div>' +
                        '</div>',
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

            scope.GetTemplateUrl = GetTemplateUrl;
            scope.CloseModal = CloseModal;
            scope.OkModal = OkModal;
            scope.OpenTab = OpenTab;

            /**
            *
            * Modal Initialization 
            *
            */
            function _modalSetEvent () {
                if (scope.id === $rootScope.id_config.addContact) {    
                    $rootScope.$on('$stateShowAddContact', function() {
                        $('#' + $rootScope.id_config.addContact).show();
                    });
                } else if (scope.id === $rootScope.id_config.addRelationship) {
                    $rootScope.$on('$stateShowAddRelationship', function() {
                        $('#' + $rootScope.id_config.addRelationship).show();
                    });
                }
            }


            function GetTemplateUrl () {
                return NG_PATH.DIRECTIVES + scope.body;
            }
    

            function OkModal () {
                if (scope.id === $rootScope.id_config.addContact) {
                    $rootScope.$broadcast('MODAL_ADD_CONTACT_OK', scope.id, scope.contact);
                } else if (scope.id === $rootScope.id_config.addRelationship) {
                    $rootScope.$broadcast('MODAL_ADD_RELATIONSHIP_OK', scope.id, scope.relationship);
                }
            }

            function CloseModal() {
                $('#' + scope.id).hide();
            }

            function OpenTab (e) {
                e.preventDefault();
                $(e.target).tab('show');
            }

            _modalSetEvent();
        }

    }
    
})();