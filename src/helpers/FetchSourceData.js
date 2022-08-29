import axios from "axios";

async function FetchSourceData(searchType, sourceString, apikey, setNewslist, toggleError) {
    try {
        const result = await axios.get(`https://newsapi.org/v2/everything?sources=${sourceString}&apiKey=${apikey}`);
        if (searchType === 'source') {
            console.log(sourceString);
            return result.data.articles;
        }
    } catch (e) {
        console.error(e);
        toggleError(true);
    }
}

export default FetchSourceData;