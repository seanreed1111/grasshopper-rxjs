Rx.Observable.fromEvent(document, 'click')
.filter(function(c) { return c.clientX > c.clientY; }) 
.take(5)
.subscribe(function(c) { console.log(c.clientX, c.clientY) })