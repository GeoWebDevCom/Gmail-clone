(function(){
    'use strict';

    angular.module('dgGmail')

    .constant('ENV', 'production')
    // .constant('ENV', 'dev')

    .config(config)    

    .run(function ($rootScope) {
        $rootScope.title = 'Gmail clone';
    });


    config.$inject = ['$routeProvider', '$locationProvider', 'RestangularProvider', 'ENV'];
    function config($routeProvider, $locationProvider, RestangularProvider, ENV) {
        if( ENV === 'production' ) {
            RestangularProvider.setBaseUrl('https://gmail-clone.herokuapp.com/');
        } else {
            RestangularProvider.setBaseUrl('http://localhost:6660/'); // express on locale machine
            // RestangularProvider.setBaseUrl('http://localhost:3000/'); // to use with json-server and have no problem with node and express routes
        }

        $routeProvider
            .when('/', {
                redirectTo: '/mail'
            })

            .when('/mail', {
                templateUrl: 'app/mail/index.tpl.html',
                controller: 'MailIndexController',
                controllerAs: 'mail.index',
                resolve: {
                    mailPrepService: mailPrepService
                }
            })

            .when('/mail/new', {
                templateUrl: 'app/mail/create.tpl.html',
                controller: 'MailCreateController',
                controllerAs: 'mail.new',
            })

            .when('/mail/:mailId', {
                templateUrl: 'app/mail/read.tpl.html',
                controller: 'MailReadController',
                controllerAs: 'mail.read',
                // reloadOnSearch: false
            })

            .otherwise({redirectTo: '/'});
            // if(window.history && window.history.pushState){
            //     $locationProvider.html5Mode(true);
            // }
    }

    mailPrepService.$inject = ['mail'];
    function mailPrepService(mail) {
        mail.getAll();
    }
    
})();