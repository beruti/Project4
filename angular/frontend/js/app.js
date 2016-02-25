// angular
// 	// name app and include dependencies
// 	.module('emergency services', ['angular-jwt', 'ngResource'])
// 	// set constants so are now abstracted, stored in variables and available for re-use
// 	.constant('API', 'http://localhost:3000/api')
// 	// configure middleware - that which will be run each time communication is made between front and back
// 	.config(function($httpProvider){
// 		$httpProvider.interceptors.push('authInterceptor');
// 	})

angular
	// name app and include dependencies
	.module('emergency services', [])
	// set constants so are now abstracted, stored in variables and available for re-use
	.constant('API', 'http://localhost:3000/')
	// configure middleware - that which will be run each time communication is made between front and back
	// .config(function($httpProvider){
	// 	$httpProvider.interceptors.push('authInterceptor');
	// })
