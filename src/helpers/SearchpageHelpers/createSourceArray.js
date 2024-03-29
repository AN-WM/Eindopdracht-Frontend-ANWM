function createSourceArray(searchType, sourceList) {
    if (searchType === 'source') {
        if (sourceList.length >= 0) {
            //Use only the ID's in the array
            return sourceList.map(source => source.id.toString());
        }
    }
}
export default createSourceArray;