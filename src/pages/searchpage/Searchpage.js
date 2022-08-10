import React, {useEffect, useState} from 'react';
import Searchbar from "../../components/searchbar/Searchbar";
import NewsTile from "../../components/newstile/NewsTile";
import Header from "../../components/header/Header";
import FilterBar from "../../components/filterbar/FilterBar";
import axios from "axios";
import './Searchpage.css';

function Searchpage({searchkey, searchtype, country, apikey}) {
    const [error, toggleError] = useState(false);
    const [newslist, setNewslist] = useState();
    const [totalResults, setTotalResults] = useState();

    useEffect(() => {
        toggleError(false);

        async function fetchData() {
            try {
                const result = await axios.get(`https://newsapi.org/v2/everything?q=${searchkey}&apiKey=${apikey}`);
                setTotalResults(result.data.totalResults);
                setNewslist(result.data.articles);

            } catch (e) {
                console.log(e);
                toggleError(true);
            }
        }

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <Header
                page='searchpage'
            />

            <Searchbar
                inputType={searchtype}
            />

            {error &&
                <span>
                    Oeps, er ging iets mis!
                </span>
            }

            <div className="search-page-container">
                <FilterBar
                    searchType={searchtype}
                    input={newslist}
                    totalResults={totalResults}
                />

                <div className="search-list">
                    {newslist &&
                        newslist.map((input) => {
                            return (
                                <NewsTile
                                    article={input}
                                    key={input.url}
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