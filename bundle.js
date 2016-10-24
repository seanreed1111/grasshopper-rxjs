(function() {

  var startButton = document.getElementById("startButton");
  var endButton = document.getElementById("endButton");
  var board = document.getElementById("board");

  var startingBoardArray = ["L","L","L","L","","R","R","R","R"];
  var winningBoardString = JSON.stringify(["R","R","R","R","","L","L","L","L"]);

  var startButtonClick$ = Rx.Observable.fromEvent(startButton, 'click').first();
  var endButtonClick$ = Rx.Observable.fromEvent(endButton, 'click').first();
  var boardClick$ = Rx.Observable.fromEvent(board, 'click').take(40);

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
    function(acc, clickedLocation){
      if( isValidMove(acc.indexOfBlank, clickedLocation) ){ //ignore if not valid move
        acc.boardArray = updateBoard(acc.boardArray, acc.indexOfBlank, clickedLocation)
        acc.indexOfBlank = clickedLocation;
      }
      return acc;
    },
      {boardArray: startingBoardArray, 
       indexOfBlank: startingBoardArray.indexOf("")
      }
  );

  // now, need to stop the game when JSON.stringify(boardArray) == JSON.stringify(winningBoardArray)


  runGame$.subscribe(
    function(x){console.log("boardArray: " +x.boardArray);}
    );

  function isValidMove(indexOfBlank, location){
    return Math.abs(location - indexOfBlank) <= 2  && location != indexOfBlank
  }

  function updateBoard(board, indexOfBlank, clickedLocation) {
    var newBoard = board; // MAKE A COPY OF THE ARRAY HERE!!!!! 
    newBoard[indexOfBlank] = newBoard[clickedLocation];
    newBoard[clickedLocation] = "";
    return newBoard;
  }

})(); 