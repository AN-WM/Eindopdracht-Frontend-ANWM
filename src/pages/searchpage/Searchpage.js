import React, {useEffect, useState} from 'react';
import Searchbar from "../../components/searchbar/Searchbar";
import NewsTile from "../../components/newstile/NewsTile";
import Header from "../../components/header/Header";
import FilterBar from "../../components/filterbar/FilterBar";
import './Searchpage.css';
import {v4 as uuidv4} from 'uuid';
import {useSearchParams} from "react-router-dom";
import loadArticleData from "../../helpers/SearchpageHelpers/loadArticleData";
import loadSourceData from "../../helpers/SearchpageHelpers/loadSourceData";

function Searchpage({apikey}) {
    const [error, toggleError] = useState(false);
    const [filterList, setFilterList] = useState([]);
    const [newsList, setNewsList] = useState([]);
    const [errorMessage, setErrorMessage] = useState("Oops, something went wrong");
    let [searchParams, setSearchParams] = useSearchParams();

    const {searchQuery, searchType} = Object.fromEntries(searchParams);

    useEffect(() => {
        toggleError(false);

        async function loadData() {
            setNewsList([]);
            setErrorMessage("Oops, something went wrong");

            if (searchQuery === "") {
                setErrorMessage("Please enter a keyword to start your search");
                toggleError(true);
            }
            //Fill the newsList, based on searchType, with the matching list of articles
            if (searchType === 'article') {
                loadArticleData(searchParams, apikey, setNewsList, toggleError, setErrorMessage);

            } else if (searchType === 'source') {
                loadSourceData(searchQuery, searchType, apikey, setNewsList, toggleError, setErrorMessage);

            } else {
                console.log("Error: unknown searchtype");
                setErrorMessage("No valid searchtype was registered, please try again by selecting either source or article")
                toggleError(true);
            }
        }

        loadData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams, apikey])


    return (
        <>
            <Header
                page='searchpage'
            />

            <Searchbar
                placeHolder={searchQuery}
                searchType={searchType}
            />

            {error && <h4 className="error-message">{errorMessage}</h4>}

            {newsList.length !== 0 &&
                <div className="search-page-container">
                    <FilterBar
                        filterList={filterList}
                        setFilterList={setFilterList}
                        input={newsList}
                        searchParams={searchParams}
                        setSearchParams={setSearchParams}
                        toggleError={toggleError}
                        setErrorMessage={setErrorMessage}
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
            }
        </>
    );
}

export default Searchpage;