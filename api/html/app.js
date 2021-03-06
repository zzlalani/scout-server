'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('scout-admin', [
	'ui.bootstrap',
	'ui.router',
	'angular-loading-bar',
	'oitozero.ngSweetAlert'
])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/");
	$stateProvider.state('index', {
		url: "/",
		templateUrl: "index/index.html",
		controller: "IndexCtrl"
	})
	.state('scout', {
		url: "/scout",
		templateUrl: "scout/scout.html",
		controller: "ScoutCtrl"
	})
	.state('user', {
		url: "/user",
		templateUrl: "user/user.html",
		controller: "UserCtrl"
	});
		

}])
.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
	// cfpLoadingBarProvider.includeSpinner = false;
}]);
