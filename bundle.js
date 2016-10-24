(function() {

  var startButton = document.getElementById("startButton");
  var endButton = document.getElementById("endButton");
  var board = document.getElementById("board");
  var squares = document.querySelectorAll(".square")

  var winningBoardString = JSON.stringify(["R","R","R","R","","L","L","L","L"]);

  var startButtonClick$ = Rx.Observable.fromEvent(startButton, 'click').first();
  var endButtonClick$ = Rx.Observable.fromEvent(endButton, 'click').first();
  var boardClick$ = Rx.Observable.fromEvent(board, 'click');

  startButtonClick$.subscribe(
    function(e) {console.log("Start Button Clicked!")},
    function(err) {console.log("err:" +err)},
    function() {console.log("startButtonClick$ completed")}
  );

  endButtonClick$.subscribe(
    function(e) {console.log("End Button Clicked!")},
    function(err) {console.log("err:" +err)},
    function() {console.log("endButtonClick$ completed")}
  );

  var runGame$ = boardClick$
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
  .takeWhile(function(currentBoardString) {return currentBoardString !== winningBoardString})


  // in words:
  // The current board is JSON.stringify(boardArray) 

  // Continue to run the game until currentBoard$ emits the winningBoardString

  // then, 
  //  stop listening, 
  // tell the player they've won the game
  // and end the game





  // runGame$.subscribe(
  //   function(x){console.log("from runGame$ boardArray: " +x.boardArray);}
  //   );

  currentBoard$.subscribe(
    function(x){console.log("from currentBoard$ boardString: " +x);},
    function(err) {console.log('err: '+err)},
    function() {console.log('currentBoard completed!')}
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
  
})(); 