(function () {
    'use strict';
    
    angular.module('dgGmail').directive('dgSideNav', SideNav);
    function SideNav() {
        return {
            replace: true,
            restrict: 'E',
            templateUrl: 'app/components/side-nav.tpl.html',
            controller: SideNavCtrl,
            controllerAs: 'sideNavCtrl',
            bindToController: true
        };
    }

    SideNavCtrl.$inject = ['$scope', '$location', 'mail', 'settings'];
    function SideNavCtrl($scope, $location, mail, settings) {
        var vm = this;
        activate();

        function activate() {
            vm.totals = mail.getTotals();
        }

        vm.isBoxActive = function(box) {
            return ~(box.indexOf($location.search().box));
        };

        vm.openBox = function(mailbox) {
            $location.path('/mail/').search({'box': mailbox, 'page': 1});
            settings.setBox(mailbox);
            $scope.$broadcast('boxChange', mailbox);
        };
    }
    
})();