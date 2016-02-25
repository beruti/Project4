angular.module('CardsAgainstAssembly')
		.directive('repeater' , RepeatFunction);

function RepeatFunction() {

	var directive = {

		restrict: "E",
		replace: true,
		templateUrl: "_repeater.html",
		scope: {

			values: '='

		}

	}

	return directive;

}