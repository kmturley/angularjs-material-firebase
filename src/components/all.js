/**
 * All
 * @author kmturley
 */

// libraries
import angular from 'angular';
import angularfire from 'angularfire';
import ngAnimate from 'angular-animate';
import ngAria from 'angular-aria';
import ngMaterial from 'angular-material';
import ngRoute from 'angular-route';
import ngResource from 'angular-resource';

// shared
import Auth from './shared/Auth';
import Data from './shared/Data';
import Firebase from './shared/Firebase';

// components
import Explore from './explore/explore';

let mainModule = angular.module('all', [
        'firebase',
        'ngAnimate',
        'ngMaterial',
        'ngAria',
        'ngRoute',
        'ngResource'
    ])

    .config(['$compileProvider', '$mdThemingProvider', '$routeProvider', '$locationProvider',
        function($compileProvider, $mdThemingProvider, $routeProvider, $locationProvider) {
        $compileProvider.debugInfoEnabled(false);
        $mdThemingProvider.theme('default').primaryPalette('blue').accentPalette('red');
        $locationProvider.html5Mode(true);

        $routeProvider
            .when('/', { templateUrl: './src/pages/home.tpl' })
            .otherwise('/');
    }])

    .run(['$rootScope', 'Auth', function($rootScope, Auth) {
        $rootScope.auth = Auth;
        $rootScope.auth.init();
    }])

    // shared
    .factory('Auth', Auth)

    // components
    .component('explore', Explore);

angular.bootstrap(document.body, [mainModule.name]);
