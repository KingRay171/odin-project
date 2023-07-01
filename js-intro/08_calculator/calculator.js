const add = function(a, b) {
  return a + b
};

const subtract = function(a, b) {
	return a - b
};

const sum = function(arr) {
	return arr.reduce( (x, y) => x + y, 0)
};

const multiply = function() {
  return Array.from(arguments).reduce((x, y) => x * y)
};

const power = function(a, b) {
	return Math.pow(a, b)
};

const factorial = function(num) {
  
	if(num === 0 || num === 1){
    return 1;
  }
  return num * factorial(num - 1)
};

// Do not edit below this line
module.exports = {
  add,
  subtract,
  sum,
  multiply,
  power,
  factorial
};
