function createSourceArray(searchType, sources) {
    if (searchType === 'source') {
        console.log(sources);
        if (sources.length >= 0) {
            //Use only the ID's in the array
            return sources.map(source => source.id);
        }
    }
}

export default createSourceArray;