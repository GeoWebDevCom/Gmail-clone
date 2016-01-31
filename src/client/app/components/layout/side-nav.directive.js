(function () {
    'use strict';
    
    angular.module('dgGmail').directive('dgSideNav', SideNav);
    function SideNav() {
        return {
            replace: true,
            restrict: 'E',
            templateUrl: 'app/components/layout/side-nav.tpl.html',
            controller: SideNavCtrl,
            controllerAs: 'sideNavCtrl',
            bindToController: true
        };
    }

    SideNavCtrl.$inject = ['$scope', '$location', 'mail', 'settings', '$stateParams', '$state'];
    function SideNavCtrl($scope, $location, mail, settings, $stateParams, $state) {
        var vm = this;
        activate();

        function activate() {
            vm.totals = mail.getTotals();
        }

        vm.isBoxActive = function(box) {
            return ~(box.indexOf($stateParams.box));
        };

        vm.openBox = function(mailbox) {
            // $location.path('/mail/').search({'box': mailbox, 'page': 1});
            $state.go('mail', {box: mailbox, page: 1});
            settings.setBox(mailbox);
            $scope.$broadcast('boxChange', mailbox);
        };
    }
    
})();