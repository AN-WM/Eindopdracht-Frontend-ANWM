import axios from "axios";

async function FetchArticleData(searchType, searchTerm, apikey, setNewslist, toggleError) {

    try {
        const result = await axios.get(`https://newsapi.org/v2/everything?q=${searchTerm}&apiKey=${apikey}`);
        toggleError(false);
        if (searchType === 'article') {
            return result.data.articles;
        }
    } catch (e) {
        console.log(e);
        toggleError(true);
    }
}

export default FetchArticleData;