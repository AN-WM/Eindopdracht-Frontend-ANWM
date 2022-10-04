import axios from "axios";

async function FetchArticleData(searchParams, pageSize, apikey, setNewslist, toggleError, setErrorMessage) {
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
        const result = await axios.get(
            `https://newsapi.org/v2/everything?q=${searchQuery}&pageSize=${pageSize}${sourceString}${languageString}${sortString}${startDateString}${endDateString}&apiKey=${apikey}`);
        toggleError(false);
        if (searchType === 'article') {
            return result.data;
        }
    } catch (e) {
        console.log(e);
        toggleError(true);
        setErrorMessage("No articles found, please try another query")
    }
}

export default FetchArticleData;