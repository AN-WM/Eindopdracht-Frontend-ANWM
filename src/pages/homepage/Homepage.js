import React, {useContext, useEffect, useState} from 'react';
import logo from "../../assets/Newslogo.png";
import Searchbar from "../../components/searchbar/Searchbar";
import NewsTile from "../../components/newstile/NewsTile";
import Header from "../../components/header/Header";
import axios from "axios";
import './Homepage.css';
import {AuthContext} from "../../context/AuthContext";
import {createSearchParams} from 'react-router-dom';

function Homepage({apikey}) {
    const [error, toggleError] = useState(false);
    const [newslist, setNewslist] = useState([]);
    const [pageSize, setPageSize] = useState(15);
    const {authState: {userCountry}} = useContext(AuthContext);
    const params = { type: '', input: '' };


    useEffect(() => {
        toggleError(false);

        async function fetchData() {
            try {
                if (userCountry !== undefined) {
                    const result = await axios.get(`https://newsapi.org/v2/top-headlines?country=${userCountry}&apiKey=${apikey}`);
                    setNewslist(result.data.articles);
                }
                else {
                    const result = await axios.get(`https://newsapi.org/v2/top-headlines?pageSize=${pageSize}&country=nl&apiKey=${apikey}`);
                    setNewslist(result.data.articles);
                }
            } catch (e) {
                console.log(e);
                toggleError(true);
            }
        }

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageSize])

    return (
        <>
            <Header
                page='home'
            />

            <img src={logo} alt="App logo" className="large-logo"/>

            <Searchbar
                searchParams={createSearchParams(params)}
            />

            {error &&
                <span id="error-message">
                    Oeps, er ging iets mis!
                </span>
            }

            <div className="home-list">
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

            <button
                type="button"
                className="load-more-button"
                onClick={()=> setPageSize(pageSize + 15)}
            >
                Load more items
            </button>
        </>
    );
}

export default Homepage;