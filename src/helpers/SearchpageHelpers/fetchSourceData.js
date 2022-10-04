import axios from "axios";

async function FetchSourceData(searchType, sourceString, pageSize, apikey, toggleError) {
    try {
        const result = await axios.get(`https://newsapi.org/v2/everything?sources=${sourceString}&pageSize=${pageSize}&apiKey=${apikey}`);
        toggleError(false);
        return result.data;
    } catch (e) {
        console.log(e);
        toggleError(true);
        return  e.code
    }
}

export default FetchSourceData;