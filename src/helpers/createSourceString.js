function createSourceString(searchType, sources, setSourceArray, sourceArray) {
    if (searchType === 'source') {
        console.log(sources);
        if (sources.length >= 0) {
            //Use only the ID's in the array
            setSourceArray(sources.map(source => source.id));
            if (sourceArray.length >= 0) {
                console.log(sourceArray);
                //Convert to string
                return sourceArray.toString();
            }
        } else {
            console.log("Er ging iets mis met de sourceString")
        }
    }
}

export default createSourceString;