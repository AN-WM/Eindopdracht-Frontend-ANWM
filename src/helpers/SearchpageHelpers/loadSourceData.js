import fetchSourceList from "./fetchSourceList";
import createSourceArray from "./createSourceArray";
import FetchSourceData from "./fetchSourceData";

async function loadSourceData(searchQuery, searchType, pageSize, apikey, setNewsList, setTotalResults, toggleError, setErrorMessage) {
    setErrorMessage("Oops, something went wrong");

    try {
            //Load an array of unique available sources, including the searchTerm
            const sourceList = await fetchSourceList(searchQuery, apikey, toggleError);

            //Create a list of only the id's in the previous array and merge into one string
            const sourceString = createSourceArray(searchType, sourceList).toString();

            //Fetch the articles, based on their source
            // const articlesBySource = await FetchSourceData(searchType, sourceString, pageSize, apikey, toggleError);
            const sourceData = await FetchSourceData(searchType, sourceString, pageSize, apikey, toggleError);
            const articlesBySource = sourceData.articles;
            //Check whether articles were returned. If so, fill the newslist. If not, display an error message.
            if (articlesBySource === "ERR_BAD_REQUEST") {
                setErrorMessage("No sources found, please try another query")
                toggleError(true);
            } else {
                setNewsList(articlesBySource)
                setTotalResults(sourceData.totalResults);
            }
    } catch (e) {
        console.error(e);
    }
}

export default loadSourceData;