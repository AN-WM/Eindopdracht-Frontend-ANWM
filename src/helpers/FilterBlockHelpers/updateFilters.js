function updateFilters(initialValue, inputValue) {
    let completeString = "";

    //Check whether there has been a sourceId declared already
    if (initialValue !== '') {
        //If a source has been declared, check whether it's a new item (selected) or a previously declared item (deselected)
        const indexOfItem = initialValue.indexOf(inputValue);
        //In case of a new item, add it as a filter for the search query
        if (indexOfItem === -1) {
            completeString = initialValue + "," + inputValue;
            return completeString;
        }
        //In case of an existing item, remove it as a filter from the search query
        else {
            //Remove the inputValue from the exising string
            completeString = initialValue.replace(inputValue, '');
            //If the first item of the string was removed, also remove the remaining comma
            if (completeString.indexOf(",") === 0) {
                completeString = completeString.substring(1);
            //If a center item of the string was removed, also remove the remaining extra comma
            } else if (completeString.indexOf(",,") !== 0) {
                completeString = completeString.replace(",,", ',');
            }
            return completeString;
        }
    }
    else {
        //If no source has been declared yet, make this the first one
        return inputValue;
    }
}

export default updateFilters;