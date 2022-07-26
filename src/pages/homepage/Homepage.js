import React, {useEffect, useState} from 'react';
import logo from "../../assets/Newslogo.png";
import Searchbar from "../../components/searchbar/Searchbar";
import NewsTile from "../../components/newstile/NewsTile";
import axios from "axios";
import './Homepage.css';

function Homepage({country, apikey}) {
    const [error, toggleError] = useState(false);
    const [newslist, setNewslist] = useState();

    useEffect(() => {
        toggleError(false);

        async function fetchData() {
            try {
                const result = await axios.get(`https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${apikey}`);
                setNewslist(result.data.articles);
                console.log(result.data.articles);
            }
            catch (e) {
                console.log(e);
                toggleError(true);
            }
        }

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <img src={logo} alt="App logo" className="large-logo"/>
            <Searchbar/>
            <div>Home</div>
            {error &&
                <span>
                    Oeps, er ging iets mis!
                </span>
            }
            <div className="home-list">
                {newslist &&
                    newslist.map((input) => {
                        return (
                            <NewsTile
                                article = {input}
                                key={input.url}
                                error={error}
                                toggleError={toggleError}
                            />
                        )
                    })
                }
            </div>
        </>
    );
}

export default Homepage;