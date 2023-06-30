const reverseString = function(string) {
    let result = ""
    for(i = string.length - 1; i > -1; i--){
        result += string.charAt(i);
    }
    return result;
    
};

// Do not edit below this line
module.exports = reverseString;
