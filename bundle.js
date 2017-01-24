(function main() {

  var STARTING_POSITION = ["L","L","L","L","","R","R","R","R"];
  var WINNING_BOARD_STRING = JSON.stringify(["R","R","R","R","","L","L","L","L"]);

  var startButton = document.getElementById("startButton");
  var board = document.getElementById("board");
  var squares = document.querySelectorAll(".square");

  var startButtonClick$ = Rx.Observable.fromEvent(startButton, 'click').first();
  var boardClick$ = Rx.Observable.fromEvent(board, 'click');

  var runGame$ = startButtonClick$
  .switchMap(function(e) {return boardClick$})
  .map(function(e) {return e.target.dataset.location})
  .scan(
    function(acc, location){
      if( isValidMove(acc, location) ){
        acc = updateAcc(acc, location);
      }
      return acc;
    },
      {boardArray: STARTING_POSITION.slice(),
       indexOfBlank: STARTING_POSITION.indexOf("")
      }
  )
  .do(function(acc) {updateUI(acc.boardArray)})
  .map(function(acc) {return JSON.stringify(acc.boardArray)})
  .filter(function(currentBoardString)
    {return currentBoardString === WINNING_BOARD_STRING})
//  .do(function(isWinner){ if(isWinner) {gameOver()}})
  .takeWhile(function(isWinner) {return isWinner === false})

// Subscribe to make the observable 'hot'
  runGame$.subscribe(
    function(x){console.log("currentBoard$ boardString: " +x);},
    function(err) {console.log('err: '+err)},
    function() {gameOver()}
  );


// functions needed for the MODEL

  function isValidMove(acc, location){
    return Math.abs(location - acc.indexOfBlank) <= 2  && location !== acc.indexOfBlank
  }

  function updateAcc(acc, location) {
    var newAcc = {};
    newAcc.indexOfBlank = location;
    newAcc.boardArray = acc.boardArray.slice();

    newAcc.boardArray[acc.indexOfBlank] = newAcc.boardArray[location];
    newAcc.boardArray[location] = "";
    return newAcc;
  }

  // functions needed for the VIEW
  function updateUI(boardArray){
    squares.forEach(function(square) {
      square.innerHTML = boardArray[square.dataset.location];
    })
  }

    function gameOver(){
      console.log("Congratulations You've Finished the Game");
      h1 = document.createElement("h1");
      text1 = document.createTextNode("You Won!! Congratulations!");
      text2 = document.createTextNode("Press Cmd-R to Play Again");

      winner = document.getElementById("winner")
      winner.appendChild(h1).appendChild(text1);
      winner.appendChild(text2);
    }
})();