import React, {useContext, useEffect, useState} from 'react';
import Searchbar from "../../components/searchbar/Searchbar";
import NewsTile from "../../components/newstile/NewsTile";
import Header from "../../components/header/Header";
import FilterBar from "../../components/filterbar/FilterBar";
import fetchSourceList from "../../helpers/fetchSourceList";
import './Searchpage.css';
import {SearchContext} from "../../context/SearchContext";
import FetchArticleData from "../../helpers/FetchArticleData";
import FetchSourceData from "../../helpers/FetchSourceData";
import createSourceString from "../../helpers/createSourceString";

function Searchpage({apikey}) {
    const [error, toggleError] = useState(false);
    const [newslist, setNewslist] = useState([]);
    const [sourceList, setSourceList] = useState([]);
    const {searchValue: {searchTerm, searchType}} = useContext(SearchContext);
    const [sourceArray, setSourceArray] = useState([]);
    const [sourceString, setSourceString] = useState('');

    useEffect(() => {
        toggleError(false);

        //Fetch list of all sources available, filtered to contain only unique items
        fetchSourceList(searchTerm, apikey, sourceList, setSourceList, toggleError);

        //Transform sourceList array into a string
        createSourceString(searchType, sourceList, setSourceArray, sourceArray, setSourceString);

        //Fetch articles, either based on searchTerm or sourceString.
        FetchArticleData(searchType, searchTerm, apikey, setNewslist, toggleError);
        FetchSourceData(searchType, sourceString, apikey, setNewslist, toggleError);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchTerm, searchType, apikey])

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
                    input={newslist}
                />

                <div className="search-list">
                    {newslist &&
                        newslist.map((input) => {
                            return (
                                <NewsTile
                                    article={input}
                                    key={input.url + input.id}
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