function createSourceString(searchType, sourceArray) {
    if (searchType === 'source') {
        console.log(sourceArray);
        if (sourceArray.length >= 0) {
            //Convert to string
            return sourceArray.toString();
        }
    } else {
        console.log("Er ging iets mis met de sourceString")
    }
}

export default createSourceString;