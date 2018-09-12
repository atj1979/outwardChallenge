# outwardChallenge

Build and run mac terminal command 
```npm run debug```

Closures

Javascript creates a 'scope' for each function that it creates.  Additionally if a variable referenced is not in the current scope, it will check the next closest scope in a stack like manner.  When an executed function returns a non executed function - the non executed function will always have the first function as the first scope available after the local scope.  For example

```
function wrapper (){
    var enclosedVariable = 10;
    return function (){
        return enclosedVariable;
    }
}

var wrapped = wrapper();
// wrapped is now a function that has access to an enclosed scope - that can only be accessed by calling this wrapped function
wrapped() // returns 10
```

Hoisting

Hoisting allows some items to be declared (but not initialized) at the beginning of execution.  This allows the Just In Time compilier to reserve memory before they become initialized.
```
fxn(); // emits an error
var fxn = function(){ return 3; };
```
```
hoisted();  // returns 4 - because it was hoisted
function hoisted(){ return 4; }
```


