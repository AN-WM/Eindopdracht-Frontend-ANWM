import React, {useContext, useEffect, useState} from 'react';
import Searchbar from "../../components/searchbar/Searchbar";
import NewsTile from "../../components/newstile/NewsTile";
import Header from "../../components/header/Header";
import FilterBar from "../../components/filterbar/FilterBar";
import axios from "axios";
import './Searchpage.css';
import {SearchContext} from "../../context/SearchContext";

function Searchpage({apikey}) {
    const [error, toggleError] = useState(false);
    const [newslist, setNewslist] = useState();
    const [sourceList, setSourceList] = useState();
    const {searchValue: {searchTerm, searchType}} = useContext(SearchContext);
    const [sourceArray, setSourceArray] = useState();
    const [sourceString, setSourceString] = useState();

    useEffect(() => {
            toggleError(false);

            async function fetchSourceList() {
                try {
                    const result = await axios.get(`https://newsapi.org/v2/top-headlines/sources?apiKey=${apikey}`);
                    console.log(result);
                    setSourceList(
                        result.data.sources.filter((source) => {
                            return source.name.toLowerCase().includes(searchTerm.toLowerCase());
                        })
                    );
                } catch (e) {
                    console.error(e);
                    toggleError(true);
                }
            }

            async function fetchData() {
                if (searchType === 'article') {
                    try {
                        const result = await axios.get(`https://newsapi.org/v2/everything?q=${searchTerm}&apiKey=${apikey}`);
                        setNewslist(result.data.articles);
                    } catch (e) {
                        console.error(e);
                        toggleError(true);
                    }
                } else if (searchType === 'source') {
                    try {
                        console.log(sourceString);
                        const result = await axios.get(`https://newsapi.org/v2/everything?sources=${sourceString}&apiKey=${apikey}`);
                        setNewslist(result.data.articles);
                    } catch (e) {
                        console.error(e);
                        toggleError(true);
                    }
                }
            }

            if (searchType === 'source') {
                fetchSourceList();
                if (sourceList !== undefined) {
                    setSourceArray(sourceList.map(source => source.id));
                    if (sourceArray !== undefined) {
                        setSourceString(sourceArray.toString());
                    }

                }
            }

            fetchData();
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [searchTerm, searchType, apikey]
    )

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