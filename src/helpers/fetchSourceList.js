import axios from "axios";
import createSourceString from "./createSourceString";
async function fetchSourceList(searchType, searchTerm, apikey, sourceList, setSourceList, sourceArray, setSourceArray, sourceString, setSourceString, setNewslist, toggleError) {

    try {
        const result = await axios.get(`https://newsapi.org/v2/top-headlines/sources?apiKey=${apikey}`);
        console.log(result.data.sources);
        setSourceList(result.data.sources.filter((source) => {
                        return source.name.toLowerCase().includes(searchTerm.toLowerCase());
                    }));

        createSourceString(searchType, sourceList, setSourceArray, sourceArray, setSourceString, sourceString, apikey, setNewslist, toggleError);
    } catch (e) {
        console.error(e);
        toggleError(true);
    }

    // console.log(sourceList);
}

export default fetchSourceList;