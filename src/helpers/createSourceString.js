import FetchSourceData from "./FetchSourceData";

function createSourceString(searchType, sourceList, setSourceArray, sourceArray, setSourceString, sourceString, apikey, setNewslist, toggleError) {

    if (searchType === 'source') {
        console.log(sourceList);
        if (sourceList.length >= 0) {
            //Use only the ID's in the array
            setSourceArray(sourceList.map(source => source.id));
            if (sourceArray.length >= 0) {
                console.log(sourceArray);
                //Convert to string
                setSourceString(sourceArray.toString());
                FetchSourceData(searchType, sourceString, apikey, setNewslist, toggleError);
            }
        } else {
            console.log("Er ging iets mis met de sourceString")
        }
    }
}

export default createSourceString;