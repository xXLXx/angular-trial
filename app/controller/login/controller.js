/**
 * Angular Controller: LoginController
 *
 * Login Controller
 */
(function() {
    
    'use strict';

    angular
        .module('lmr-trial')
        .controller('LoginController', LoginController);

    function LoginController($rootScope, $scope, Auth, UserSession) {

     var vm = this;
         // vm.auth = null;


     
    // ===================================== //
    //          FUNCTION REFERENCE           //
    // ===================================== //
        
        vm.Login = Login;
       
    // ===================================== //
    //         FUNCTION DEFINITION(S)        //
    // ===================================== //

        function Login() {

            if (vm.auth && vm.auth.email && vm.auth.password) {
                UserSession.SetEmailPass(vm.auth.email, vm.auth.password);
                Auth.Login({
                    'username' : vm.auth.email,
                    'password' : vm.auth.password
                }).then(function (response){
                    UserSession.Set(response);
                }, function (error) {
                    console.log(error);
                });
            } 
        }

    }
    
})();