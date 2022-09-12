import axios from "axios";
async function fetchSourceList(searchTerm, apikey, toggleError) {

    try {
        const result = await axios.get(`https://newsapi.org/v2/top-headlines/sources?apiKey=${apikey}`);
        toggleError(false);
        return (result.data.sources.filter((source) => {
                        return source.name.toLowerCase().includes(searchTerm.toLowerCase());
                    }));
    } catch (e) {
        console.log(e);
        toggleError(true);
    }

    // console.log(sourceList);
}

export default fetchSourceList;