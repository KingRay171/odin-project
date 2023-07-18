const capitalize = (str) => {
  let firstChar = str[0];
  firstChar = firstChar.toUpperCase();
  let restOfStr = str.slice(1, str.length);
  return firstChar + restOfStr;
};

export default capitalize;
