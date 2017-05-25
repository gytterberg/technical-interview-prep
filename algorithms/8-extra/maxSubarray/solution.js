function maxSub(array){
    var maxSum = 0, currSum = 0; //hold each sum
    var start = 0, end = 0; //indices of currSum            
    var maxStart = 0, maxEnd = 0; //indices of maxSum
    array.forEach((el, i) => {
        //if the currSum and the new element are less than 0
        //   then reset current to start at the next positive sum
        if (currSum + el < 0){
            currSum = 0;
            start = i+1;
            end = i+1;
        //Otherwise, add to the current (sum and end index)
        } else {
            currSum = currSum + el;
            end = i+1;
        }
        //If the current sum is greater than the current max sum
        //  then update max (sum and indices)
        if (currSum > maxSum){
            maxStart = start;
            maxEnd = end;
            maxSum = currSum;
        } 
    });
    //return slice -- remember end is exclusive
    return array.slice(maxStart,maxEnd);
}
