import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from "../../context/AuthContext";
import {useSearchParams} from "react-router-dom";
import {v4 as uuidv4} from 'uuid';
import Searchbar from "../../components/searchbar/Searchbar";
import NewsTile from "../../components/newstile/NewsTile";
import Header from "../../components/header/Header";
import FilterBar from "../../components/filterbar/FilterBar";
import loadArticleData from "../../helpers/SearchpageHelpers/loadArticleData";
import loadSourceData from "../../helpers/SearchpageHelpers/loadSourceData";
import './Searchpage.css';

function Searchpage() {
    const {apiKey} = useContext(AuthContext);
    const [error, toggleError] = useState(false);
    const [pageSize, setPageSize] = useState(15);
    const [totalResults, setTotalResults] = useState(0);
    const [filterList, setFilterList] = useState([]);
    const [newsList, setNewsList] = useState([]);
    const [errorMessage, setErrorMessage] = useState("Oops, something went wrong");
    let [searchParams, setSearchParams] = useSearchParams();
    const {searchQuery, searchType} = Object.fromEntries(searchParams);
    const [oldParams, setOldParams] = useState({
        searchQuery: "",
        searchType: ""
    })

    useEffect(() => {
        toggleError(false);

        async function loadData() {
            setNewsList([]);
            setErrorMessage("Oops, something went wrong");

            //If no query has been entered, return an error.
            if (searchQuery === "") {
                setErrorMessage("Please enter a keyword to start your search");
                toggleError(true);

            //Otherwise fill the newsList, based on searchType, with the matching list of articles
            } else if (searchType === 'article') {
                loadArticleData(searchParams, pageSize, apiKey, setNewsList, setTotalResults, toggleError, setErrorMessage);

            } else if (searchType === 'source') {
                loadSourceData(searchQuery, searchType, pageSize, apiKey, setNewsList, setTotalResults, toggleError, setErrorMessage);

            } else {
                console.log("Error: unknown searchtype");
                setErrorMessage("No valid searchtype was registered, please try again by selecting either source or article")
                toggleError(true);
            }
        }

        loadData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams, pageSize, apiKey])


    return (
        <>
            <Header
                page='searchpage'
            />

            <Searchbar
                placeHolder={searchQuery}
                searchType={searchType}
            />

            <div className="search-page-container">
                    <FilterBar
                        filterList={filterList}
                        setFilterList={setFilterList}
                        oldParams={oldParams}
                        setOldParams={setOldParams}
                        input={newsList}
                        searchParams={searchParams}
                        setSearchParams={setSearchParams}
                        toggleError={toggleError}
                        setErrorMessage={setErrorMessage}
                    />

                <div className="right-search-container">
                    {!error &&
                        <h4
                            id="total-results-text"
                        >
                            {totalResults} results
                        </h4>
                    }

                    <div className="search-list">
                        {error && <h4 className="error-message">{errorMessage}</h4>}

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
            </div>

            {newsList && newsList.length !== 0 && totalResults > 15 &&
                <button
                    type="button"
                    className="load-more-button"
                    onClick={() => setPageSize(pageSize + 15)}
                >
                    Load more items
                </button>
            }
        </>
    );
}

export default Searchpage;