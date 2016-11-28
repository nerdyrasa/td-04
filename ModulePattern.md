# Module Pattern

Don't clutter the global namespace.

Most basic module pattern is wrapping your code in a self-executing anonymous function.

```
(function() {
	function foo() {
		console.log('foobar');
};

foo();

}());

```

A cool trick is to replace the closure with a +, !, -, or ~. These operators convert the function declaration to a function expression.

```
+function() {
	function foo() {
		console.log('foobar');
};

foo();

}();

```
or
```
!function() {
	function foo() {
		console.log('foobar');
};

foo();

}();

```
This is good to do when you are concatenating files together.

We can import other libraries into our own module by bringing it by passing it as an argument to the function. The function parameter can be given a different name. In the case below, we are passing _ as an argument and it's parameter name is underscore.


```
!function(underscore){
	underscore.someawesomemthod = "yay!!!";
}(_);
```

Minifiers are able to rename global variables that have been invoked with a local reference.


```
var awesomeNewModule = (function() {
	var export = {
		foo: 5,
		bar: 10
	};
	exports.helloMars = function() {
		console.log("Hello Mars!");
	};
	return exports;
}());
```

### Augmentation

With loose augmentation we can take advantage with JavaScripts asynchronous runtime environment.

If awesomeNewModule exists, import it. Otherwise, awesomeNewModule is simply an object.

```
var awesomeNewModule = (function() {
	var export = {
		foo: 5,
		bar: 10
	};
	exports.helloMars = function() {
		console.log("Hello Mars!");
	};
	return exports;
}(awesomeNewModule || {}));
```

> In my experience, it’s rare for an application to be able to work with loose > augmentation. Modules inevitably have dependencies on one another, and  therefore have to load in a specific order.
[James Edward] (https://www.sitepoint.com/modular-design-patterns-in-javascript/))


Submodule pattern (13:00)
