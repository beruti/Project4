angular.module('CardsAgainstAssembly')
	.directive('cardcreator' , cardCreatorFunction);

function cardCreatorFunction() {

	// doesn't matter what this is called
	var directive = {

		restrict: "E",
		replace: true,
		// template: "<h1></h1>", // could use this if it's a simple template
		templateUrl: "_cardCreator.html",
		scope: {

			questionTitle: '=', // = means 2 way bound variable
			clickFunction : "&",
			questionDescription: '='

		}

	}

	return directive;

}