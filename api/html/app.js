'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('scout-admin', [
	'ui.bootstrap',
	'ui.router',
	'angular-loading-bar',
	'oitozero.ngSweetAlert'
])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("index");
	$stateProvider.state('index', {
		url: "/",
		templateUrl: "index/index.html",
		controller: "IndexCtrl"
	})
	.state('scout', {
		url: "/scout",
		templateUrl: "scout/scout.html",
		controller: "ScoutCtrl"
	});
		

}])
.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
	// cfpLoadingBarProvider.includeSpinner = false;
}]);
