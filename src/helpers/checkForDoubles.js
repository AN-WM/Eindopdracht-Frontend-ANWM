function checkForDoubles(inputList, compareValue) {
    for (let i = 0; i < inputList.length; i++) {
        if (inputList[i] === compareValue) {
            return true;
        }
    }
    return false
}

export default checkForDoubles;