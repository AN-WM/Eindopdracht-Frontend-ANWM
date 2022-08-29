import axios from "axios";

async function FetchArticleData(searchType, searchTerm, apikey, setNewslist, toggleError) {

    try {
        const result = await axios.get(`https://newsapi.org/v2/everything?q=${searchTerm}&apiKey=${apikey}`);
        if (searchType === 'article') {
            setNewslist(result.data.articles);
        }
    } catch (e) {
        console.error(e);
        toggleError(true);
    }
}

export default FetchArticleData;