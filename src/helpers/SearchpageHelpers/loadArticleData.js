import FetchArticleData from "./fetchArticleData";

async function loadArticleData(searchParams, pageSize, apikey, setNewsList, setTotalResults, toggleError, setErrorMessage) {
    setErrorMessage("Oops, something went wrong");

    try {
        //Fetch the articles, based on the searchQuery
        // const articlesByArticle = await FetchArticleData(searchParams, pageSize, apikey, setNewsList, toggleError);
        const articleData = await FetchArticleData(searchParams, pageSize, apikey, setNewsList, toggleError, setErrorMessage);
        const articlesByArticle = articleData.articles;
        //Check whether articles were returned. If so, fill the newslist. If not, display an error message.
        if (articlesByArticle.length !== 0) {
            setNewsList(articlesByArticle);
            setTotalResults(articleData.totalResults);
        } else {
            setErrorMessage("No articles found, please try another query");
            toggleError(true);
        }
    } catch (e) {
        console.error(e);
        setErrorMessage("No articles found, please try another query");
        toggleError(true);
    }
}

export default loadArticleData;