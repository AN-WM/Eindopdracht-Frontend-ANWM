import axios from "axios";

async function FetchArticleData(searchType, searchTerm, sourceId, language, sortValue, apikey, setNewslist, toggleError) {
    let sourceString = "";
    let languageString = "";
    let sortString= "";

    if (sourceId !== "" && sourceId !== undefined) {
        sourceString = `&domains=${sourceId}`;
    }
    if (language !== "" && language !== undefined) {
        languageString = `&language=${language}`;
    }
    if (sortValue !== "" && sortValue !== undefined) {
        sortString = `&sortBy=${sortValue}`;
    }

    try {
        const result = await axios.get(`https://newsapi.org/v2/everything?q=${searchTerm}${sourceString}${languageString}${sortString}&apiKey=${apikey}`);
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