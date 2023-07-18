const alphabet = "abcdefghijklmnopqrstuvwxyz";
const cipher = "bcdefghijklmnopqrstuvwxyza";

const isUpperCase = (char) =>
  char === char.toUpperCase() && char !== char.toLowerCase();
const isLowerCase = (char) =>
  char !== char.toUpperCase() && char === char.toLowerCase();

const singleCharCipher = (char) => {
  const index = alphabet.indexOf(char);
  return cipher[index];
};

const caesarCipher = (str) => {
  if (typeof str !== "string") {
    return "not a string";
  }

  let newString = "";

  for (let i = 0; i < str.length; i++) {
    let uppercase = isUpperCase(str[i]);
    let lowercase = isLowerCase(str[i]);
    if (lowercase || uppercase) {
      if (lowercase) {
        newString += singleCharCipher(str[i]);
      } else {
        newString += singleCharCipher(str[i].toLowerCase()).toUpperCase();
      }
    } else {
      newString += str[i];
    }
  }
  return newString;
};

export default caesarCipher;
