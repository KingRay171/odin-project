const palindromes = function (str) {

    let charsToFilter = [" ", "!", ".", ","]

    let compressedString = Array.from(str).filter((e) => !charsToFilter.includes(e)).join("").toLowerCase()

    return compressedString === compressedString.split("").reverse().join("")

};

// Do not edit below this line
module.exports = palindromes;
