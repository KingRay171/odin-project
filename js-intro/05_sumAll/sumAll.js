const sumAll = function(arg1, arg2) {
    if(typeof(arg1) != "number" || typeof(arg2) != "number" || arg1 < 0 || arg2 < 0){
        return "ERROR";
    }

    let result = 0;

    if(arg1 > arg2){
        for(i = arg2; i <= arg1; i++){
            result += i;
        }
    }
    else {
        for(i = arg1; i <= arg2; i++){
            result += i;
        }
        
    }
    return result;
};

// Do not edit below this line
module.exports = sumAll;
