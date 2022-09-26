import React, {useContext, useEffect, useState} from 'react';
import Searchbar from "../../components/searchbar/Searchbar";
import NewsTile from "../../components/newstile/NewsTile";
import Header from "../../components/header/Header";
import FilterBar from "../../components/filterbar/FilterBar";
import fetchSourceList from "../../helpers/fetchSourceList";
import './Searchpage.css';
import {SearchContext} from "../../context/SearchContext";
import FetchArticleData from "../../helpers/fetchArticleData";
import FetchSourceData from "../../helpers/fetchSourceData";
import createSourceArray from "../../helpers/createSourceArray";
import { v4 as uuidv4 } from 'uuid';
import loginpage from "../loginpage/Loginpage";

function Searchpage({apikey}) {
    const [error, toggleError] = useState(false);
    const [newsList, setNewsList] = useState([]);
    const {searchParameter: {searchTerm, searchType, sourceId, language, sortValue}} = useContext(SearchContext);

    useEffect(() => {
        toggleError(false);

        async function loadData() {
            try {
                //Fill the newsList, based on searchType, with the matching list of articles
                if (searchType === 'article') {
                    //Fetch the articles, based on the searchTerm
                    const articlesByArticle = await FetchArticleData(searchType, searchTerm, sourceId, language, sortValue, apikey, setNewsList, toggleError);

                    //Fill the newsList
                    setNewsList(articlesByArticle);
                } else if (searchType === 'source') {
                    //Load an array of unique available sources, including the searchTerm
                    const sourceList = await fetchSourceList(searchTerm, apikey, toggleError);

                    //Create a list of only the id's in the previous array and merge into one string
                    const sourceString = createSourceArray(searchType, sourceList).toString();

                    //Fetch the articles, based on their source
                    const articlesBySource = await FetchSourceData(searchType, sourceString, apikey, toggleError);

                    //Fill the newsList
                    setNewsList(articlesBySource);
                } else {
                    console.log("Error: unknown searchtype");
                    toggleError(true);
                }
            } catch (e) {
                console.error(e);
            }
        }

        loadData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm, searchType, sourceId, language, sortValue, apikey])


    return (
        <>
            <Header
                page='searchpage'
            />

            <Searchbar/>

            {error &&
                <span>
                    Oeps, er ging iets mis!
                </span>
            }

            <div className="search-page-container">
                <FilterBar
                    input={newsList}
                />

                <div className="search-list">
                    {newsList &&
                        newsList.map((input) => {
                            return (
                                <NewsTile
                                    article={input}
                                    key={input.url + uuidv4()}
                                    error={error}
                                    toggleError={toggleError}
                                />
                            )
                        })
                    }
                </div>
            </div>
        </>
    );
}

export default Searchpage;