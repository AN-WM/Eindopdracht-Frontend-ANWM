import arrayToString from "./arrayToString";

function updateFilters(contextArray, setContextArray, searchParameter, setSearchParameter, initialValue, inputValue) {
    let temporaryArray = contextArray;
    let completeString = "";

    //Check whether there has been a sourceId declared already
    if (initialValue !== '') {
        //If a source has been declared, check whether it's a new item (selected) or a previously declared item (deselected)
        const indexOfItem = contextArray.indexOf(inputValue);
        //In case of a new item, add it as a filter for the search query
        if (indexOfItem === -1) {
            temporaryArray.push(inputValue);
            completeString = arrayToString(temporaryArray);
            setContextArray(temporaryArray);
            return completeString;
        }
        //In case of an existing item, remove it as a filter from the search query
        else {
            temporaryArray.splice(indexOfItem, 1);
            completeString =  arrayToString(temporaryArray);
            setContextArray(temporaryArray);
            return completeString;
        }
    }
    else {
        //If no source has been declared yet, make this the first one
        // setSearchParameter({...searchParameter, language: inputValue});
        temporaryArray.push(inputValue);
        setContextArray(temporaryArray);
        return inputValue;
    }

}

export default updateFilters;