import axios from "axios";
async function fetchSourceList(searchTerm, apikey, sourceList, setSourceList, toggleError) {

    try {
        const result = await axios.get(`https://newsapi.org/v2/top-headlines/sources?apiKey=${apikey}`);
        console.log(result.data.sources);
        return (result.data.sources.filter((source) => {
                        return source.name.toLowerCase().includes(searchTerm.toLowerCase());
                    }));
    } catch (e) {
        console.error(e);
        toggleError(true);
    }

    // console.log(sourceList);
}

export default fetchSourceList;