const removeFromArray = function(array){
    let result = array;
    for(i = 1; i < arguments.length; i++){
        result = result.filter(e => e !== arguments[i])
        
    }
    return result;
};

// Do not edit below this line
module.exports = removeFromArray;
