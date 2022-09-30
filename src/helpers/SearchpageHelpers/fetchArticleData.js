import axios from "axios";

async function FetchArticleData(searchParams, apikey, setNewslist, toggleError) {
    const {searchQuery, searchType, sourceId, language, sortValue, startDate, endDate} = Object.fromEntries(searchParams);
    let sourceString = "";
    let languageString = "";
    let sortString= "";
    let startDateString="";
    let endDateString="";

    if (sourceId !== "" && sourceId !== undefined) {
        sourceString = `&domains=${sourceId}`;
    }
    if (language !== "" && language !== undefined) {
        languageString = `&language=${language}`;
    }
    if (sortValue !== "" && sortValue !== undefined) {
        sortString = `&sortBy=${sortValue}`;
    }
    if (startDate !=="" && startDate !== undefined) {
        startDateString= `&from=${startDate}`;
    }
    if (endDate !=="" && endDate !== undefined) {
        endDateString= `&to=${endDate}`;
    }

    try {
        // const result = await axios.get(`https://newsapi.org/v2/everything?q=${searchTerm}${sourceString}${languageString}${sortString}&apiKey=${apikey}`);
        const result = await axios.get(`https://newsapi.org/v2/everything?q=${searchQuery}${sourceString}${languageString}${sortString}${startDateString}${endDateString}&apiKey=${apikey}`);
        console.log(`https://newsapi.org/v2/everything?q=${searchQuery}${sourceString}${languageString}${sortString}${startDateString}${endDateString}&apiKey=${apikey}`)
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