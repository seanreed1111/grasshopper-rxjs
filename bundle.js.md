From the non rxjs version


(function() {

  var startButton = document.getElementById("startButton");
  var endButton = document.getElementById("endButton");
  var board = document.getElementById("board");

  startButton.addEventListener("click", startGame);
  endButton.addEventListener("click", endGame);

  var currentBoardArray = ["L","L","L","L","","R","R","R","R"];
  var winningBoardArray = ["R","R","R","R","","L","L","L","L"];

  var clickLocation = null;
  var blankIndex = currentBoardArray.indexOf("");

  // board click event callback handler
  function respondToBoardClick(event) {
    clickLocation = event.target.dataset.location;

    if (isValidMove()) {
      currentBoardArray[blankIndex] = currentBoardArray[clickLocation];
      currentBoardArray[clickLocation] = "";
      // console.log("current board is" +currentBoardArray);

      updateUI(clickLocation, blankIndex);
      checkForWinner();
      blankIndex = clickLocation; //reset for future moves
    }
  }

  function isValidMove(){

    var valid = (clickLocation != undefined 
      && Math.abs(clickLocation - blankIndex) <= 2
      && clickLocation - blankIndex != 0)

    if(!valid) {
      console.log("Sorry, that move is not allowed");
    }

    return valid;
  }

  function updateUI(initialPosition, finalPosition){
    // move the element from the initial position to the final position
    initialSelector = "[data-location=\"" + initialPosition.toString() + "\"]";    
    finalSelector = "[data-location=\"" + finalPosition.toString() + "\"]";

    initialPositionElement = document.querySelector(initialSelector);
    finalPositionElement = document.querySelector(finalSelector);

    finalPositionElement.innerHTML = initialPositionElement.innerHTML;
    initialPositionElement.innerHTML = "";
  }

  function checkForWinner(){


    if (JSON.stringify(winningBoardArray) == JSON.stringify(currentBoardArray)){ // the two arrays are the same
      console.log("WINNER!!!!!!!!!!!")
      h1 = document.createElement("h1");
      text1 = document.createTextNode("You Won!! Congratulations!");
      text2 = document.createTextNode("Press Cmd-R to Play Again");

      winner = document.getElementById("winner")
      winner.appendChild(h1)
            .appendChild(text1);
      winner.appendChild(text2);

      endGame();
    }
  }

// startButton callback handler
  function startGame(){
    init();
    console.log("Starting new game...Good Luck!");
    board.addEventListener("click", respondToBoardClick);
  }

// startButton callback handler
  function endGame() {
    console.log("Bye Bye. Ending Program..");
    console.log("Clearing Event Listeners..");
    clearListeners();
    console.log("Event Listeners cleared");
  }

function init(){
  currentBoardArray = ["L","L","L","L","","R","R","R","R"];
  blankIndex = currentBoardArray.indexOf("");
}

  function clearListeners(){
    board.removeEventListener("click", respondToBoardClick);
    startButton.removeEventListener("click", startGame);
    endButton.removeEventListener("click", endGame);
  }
})();





