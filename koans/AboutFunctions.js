describe("About Functions", function() {

  it("should declare functions", function() {

    function add(a, b) {
      return a + b;
    }

    expect(add(1, 2)).toBe(3);
  });

  it("should know internal variables override outer variables", function () {
    var message = "Outer";

    function getMessage() {
      return message;
    }

    function overrideMessage() {
      var message = "Inner";
      return message;
    }

    expect(getMessage()).toBe('Outer');
    expect(overrideMessage()).toBe('Inner');
    expect(message).toBe('Outer');
  });

  it("should have lexical scoping", function () {
    var variable = "top-level";
    function parentfunction() {
      var variable = "local";
      function childfunction() { // When childfunction() is called, it references the 'local' variable
        return variable;
      }
      return childfunction(); 
    }
    expect(parentfunction()).toBe('local');
  });

  it("should use lexical scoping to synthesise functions", function () {

    function makeMysteryFunction(makerValue) { 
      var newFunction = function doMysteriousThing(param) { 
        return makerValue + param;
      };

      return newFunction;
    }

    var mysteryFunction3 = makeMysteryFunction(3); // Use of JavaScript closures
    var mysteryFunction5 = makeMysteryFunction(5);

    expect(mysteryFunction3(10) + mysteryFunction5(5)).toBe(23); // 13 + 10 = 23
  });

  it("should allow extra function arguments", function () {

    function returnFirstArg(firstArg) {
      return firstArg;
    }

    expect(returnFirstArg("first", "second", "third")).toBe("first"); // only returns first arg

    function returnSecondArg(firstArg, secondArg) {
      return secondArg;
    }

    expect(returnSecondArg("only give first arg")).toBe(undefined); // doesn't return secondArg

    function returnAllArgs() {
      var argsArray = [];
      for (var i = 0; i < arguments.length; i++) {
        argsArray.push(arguments[i]);
      }
      return argsArray.join(","); // join() method returns a concatenated string
    }

    expect(returnAllArgs("first", "second", "third")).toBe("first,second,third"); 
  });

  it("should pass functions as values", function () {

    var appendRules = function (name) {
      return name + " rules!";
    };

    var appendDoubleRules = function (name) {
      return name + " totally rules!";
    };

    var praiseSinger = { givePraise: appendRules };
    expect(praiseSinger.givePraise("John")).toBe('John rules!'); // Function passed as reference in object

    praiseSinger.givePraise = appendDoubleRules;
    expect(praiseSinger.givePraise("Mary")).toBe('Mary totally rules!'); //  object's method is re-declared/re-written
  });
});
