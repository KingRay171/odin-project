const analyze = (arr) => {
  let min = arr[0];
  let max = arr[0];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < min) min = arr[i];
    else if (arr[i] > max) max = arr[i];
  }

  return {
    average: arr.reduce((a, b) => a + b) / arr.length,
    min,
    max,
    length: arr.length,
  };
};

export default analyze;
