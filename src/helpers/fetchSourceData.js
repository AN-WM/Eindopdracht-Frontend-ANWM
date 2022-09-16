import axios from "axios";

async function FetchSourceData(searchType, sourceString, apikey, toggleError) {
    try {
        const result = await axios.get(`https://newsapi.org/v2/everything?sources=${sourceString}&apiKey=${apikey}`);
        toggleError(false);
        return result.data.articles;

    } catch (e) {
        console.log(e);
        toggleError(true);
    }
}

export default FetchSourceData;