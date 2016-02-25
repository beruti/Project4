angular.module('CardsAgainstAssembly')
  .controller('cardsController', cardsController);

function cardsController(){
  var self = this;

  self.valuesToRepeat = ["Hello" , "Team" , "Console" , "The" , "Last" , "Day"];

  self.allCards = [
    { 
      question: "What is Batman's guilty pleasure?",
      description: "Thanks Rich"
    },{ 
      question: "What is Batman's guilty pleasure?",
      description: "Thanks Rich"
    },
    { 
      question: "What is Batman's guilty pleasure?",
      description: "Thanks Rich"
    },
    { 
      question: "What is Batman's guilty pleasure?",
      description: "Thanks Rich"
    },
    { 
      question: "What is Batman's guilty pleasure?",
      description: "Thanks Rich"
    }
  ]
}