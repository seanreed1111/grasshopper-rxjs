(function() {

  var startButton = document.getElementById("startButton");
  var endButton = document.getElementById("endButton");
  var board = document.getElementById("board");

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

  boardClick$
  .map(function(e) {return e.target.dataset.location})
  .do(function(e) {console.log('location is now' +e)})
  .filter(function(location) {location != undefined})
  .subscribe(function(location) {console.log("Board click on:" + e +"with location " +location)});
})(); 