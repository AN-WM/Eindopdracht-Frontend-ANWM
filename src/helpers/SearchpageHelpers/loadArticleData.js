import FetchArticleData from "./fetchArticleData";

// async function loadArticleData(searchQuery, searchType, apikey, setNewsList, toggleError, setErrorMessage) {
async function loadArticleData(searchParams, apikey, setNewsList, toggleError, setErrorMessage) {
    setErrorMessage("Oops, something went wrong");

    try {
        //Fetch the articles, based on the searchQuery
        const articlesByArticle = await FetchArticleData(searchParams, apikey, setNewsList, toggleError);

        //Check whether articles were returned. If so, fill the newslist. If not, display an error message.
        if (articlesByArticle.length !== 0) {
            setNewsList(articlesByArticle);
        } else {
            setErrorMessage("No articles found, please try another query");
            toggleError(true);
        }
    } catch (e) {
        console.error(e);
    }
}

export default loadArticleData;