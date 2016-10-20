// observable of DOM clicks from the screen

//uses 'fromEvent'

Rx.Observable.fromEvent(document, 'click')
.filter(function(c) { return c.clientX > c.clientY; }) 
.take(5)
.subscribe(
  function(c) { console.log(c.clientX, c.clientY) },
  function onError(err) {console.log('error:' +err);},
  function onCompleted() {console.log('Completed click observable!')}
)

// make observables from arrays using 'from'

arr = ['alpha', 'beta', 'gamma', 'delta'];
Rx.Observable
.from(arr)
.subscribe(function(x) {console.log('next:' +x);},
  function onError(err) {console.log('error:' +err);},
  function onCompleted() {console.log('Completed array observable!')}
);

// make an observable to broadcasts all mouse moves

var allMouseMoves = Rx.Observable.fromEvent(document, 'mousemove');

allMouseMoves.take(55)
.subscribe(
  function(e) {console.log('MouseMove event: ' + e.clientX, e.clientY);},
  function onError(err) {console.log('error:' +err);},
  function onCompleted() {console.log('Completed mousemove observable!')} //would never complete w/o the take
);

// make observables with interval function

var interval1 = Rx.Observable.interval(200)
.map(function(i) {return 'Interval1 :'+i} )
.take(20);

var interval2 = Rx.Observable.interval(100)
.map(function(i) {return 'Interval2 :'+i})
.take(50);

interval1.subscribe(
  function(x) {console.log(x);},
  function(err) {console.log('Error is' +err);},
  function() {console.log('Interval 1 completed')}
);

interval2.subscribe(
  function(x) {console.log(x);},
  function(err) {console.log('Error is' +err);},
  function() {console.log('Interval 2 completed')}
);