const fibs = (num) => {
  if (num === 1) {
    return [0];
  } else if (num === 2) {
    return [0, 1];
  }

  let result = [0, 1];
  for (let i = 2; i < num; i++) {
    result.push(result[i - 1] + result[i - 2]);
  }
  return result;
};

let result = [];

const fibonacci = function (num) {
  num = parseInt(num);
  if (num === 1 || num === 2) {
    return 1;
  }

  if (num < 0) {
    return "OOPS";
  }

  return fibonacci(num - 1) + fibonacci(num - 2);
};

const fibsRec = (num) => {
  for (let i = 1; i < num; i++) {
    result.push(fibonacci(i));
  }
};

fibsRec(9, []);

console.log(result);
