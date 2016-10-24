(function() {

  var startButton = document.getElementById("startButton");

  var board = document.getElementById("board");
  var squares = document.querySelectorAll(".square")

  var winningBoardString = JSON.stringify(["R","R","R","R","","L","L","L","L"]);

  var startButtonClick$ = Rx.Observable.fromEvent(startButton, 'click').first();

  var boardClick$ = Rx.Observable.fromEvent(board, 'click');


  var runGame$ = startButtonClick$
  .switchMap(function(e) {return boardClick$})
  .map(function(e) {return e.target.dataset.location})
  .filter(function(location) {return location != undefined})
  .scan(
    function(acc, location){
      if( isValidMove(acc.indexOfBlank, location) ){ 
        acc.boardArray = updateBoard(acc.boardArray, acc.indexOfBlank, location);
        acc.indexOfBlank = location;
      }
      return acc; //returns the previous accumulator if not a valid move, otherwise updates it
    },
      {boardArray: ["L","L","L","L","","R","R","R","R"], 
       indexOfBlank: ["L","L","L","L","","R","R","R","R"].indexOf("")
      }
  ).do(function(acc) {updateUI(acc.boardArray)}) //side effects

  var currentBoard$ = runGame$
  .map(function(acc) {return JSON.stringify(acc.boardArray)})
  .filter(function(currentBoardString){return currentBoardString === winningBoardString})
  .do(function(isWinner) { // side effect
    if(isWinner) {gameOver();}
  })


  currentBoard$.subscribe(
    function(x){console.log("from currentBoard$ boardString: " +x);},
    function(err) {console.log('err: '+err)},
    function() {console.log('congratulations! You finished the game!')}
    );

  function isValidMove(indexOfBlank, location){
    return Math.abs(location - indexOfBlank) <= 2  && location != indexOfBlank
  }

  function updateBoard(board, indexOfBlank, location) {
    var newBoard = board.slice(); // slice with no args returns an INDEPENDENT COPY of the array 
    newBoard[indexOfBlank] = newBoard[location];
    newBoard[location] = "";
    return newBoard;
  }


  // VIEW: side effects
  function updateUI(boardArray){
    squares.forEach(function(square) {square.innerHTML = boardArray[square.dataset.location];})
  }

  function gameOver(){
      console.log("WINNER!!!!!!!!!!!")
      h1 = document.createElement("h1");
      text1 = document.createTextNode("You Won!! Congratulations!");
      text2 = document.createTextNode("Press Cmd-R to Play Again");

      winner = document.getElementById("winner")
      winner.appendChild(h1).appendChild(text1);
      winner.appendChild(text2);
  }

})(); 