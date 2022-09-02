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
import createSourceArray from "../../helpers/createSourceArray";

function Searchpage({apikey}) {
    const [error, toggleError] = useState(false);
    const [newslist, setNewslist] = useState([]);
    const [sourceList, setSourceList] = useState([]);
    const {searchValue: {searchTerm, searchType}} = useContext(SearchContext);
    const [sourceArray, setSourceArray] = useState([]);
    const [sourceString, setSourceString] = useState('');

    useEffect(() => {
        toggleError(false);
        async function loadData () {
            console.log(searchType);
            try {
                //Load an array of unique available sources, including the searchTerm
                const sources = await fetchSourceList(searchTerm, apikey, sourceList, setSourceList, toggleError);
                //Create a list of only the id's in the previous array
                setSourceArray(createSourceArray(searchType, sources));
                if (sourceArray !== undefined) {
                //Convert the sourceArray to a string
                setSourceString(sourceArray.toString());}
                //Fetch the articles, based on their source
                const articlesBySource = await FetchSourceData(searchType, sourceString, apikey, setNewslist, toggleError);
                //Fetch the articles, based on the searchTerm
                const articlesbyArticle = await FetchArticleData(searchType, searchTerm, apikey, setNewslist, toggleError);

                //Fill the newslist, based on searchType, with the matching list of articles
                if (searchType === 'article') {
                    setNewslist(articlesbyArticle);
                }
                else if (searchType === 'source') {
                    setNewslist(articlesBySource);
                }
                else {
                    console.log("Nou gaat er iets op zijn kop verkeerd, er is geen searchType")
                }
            }
            catch (e) {
                console.error(e);
            }
        }

        loadData()

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