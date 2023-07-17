const mergeSort = (arr) => {
  if (arr.length === 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid, arr.length);

  return merge(mergeSort(left), mergeSort(right));
};

const merge = (leftArr, rightArr) => {
  let leftptr = 0,
    rightptr = 0;
  let mergedArr = [];
  while (leftptr < leftArr.length && rightptr < rightArr.length) {
    if (leftArr[leftptr] < rightArr[rightptr]) {
      mergedArr.push(leftArr[leftptr]);
      leftptr++;
    } else {
      mergedArr.push(rightArr[rightptr]);
      rightptr++;
    }
  }
  if (leftptr < leftArr.length) {
    while (leftptr < leftArr.length) {
      mergedArr.push(leftArr[leftptr]);
      leftptr++;
    }
  }
  if (rightptr < rightArr.length) {
    while (rightptr < rightArr.length) {
      mergedArr.push(rightArr[rightptr]);
      rightptr++;
    }
  }
  return mergedArr;
};

console.log(mergeSort([1, 5, 2, 4, 3]));
