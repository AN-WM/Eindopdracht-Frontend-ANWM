import React from 'react';
import './Newstile.css';
import logo from "../../assets/News logo icon.png";
import clipText from "../../helpers/clipText";
import dateNotation from "../../helpers/dateNotation";

function NewsTile({article, error, toggleError}) {
    const cutOff = article.title.lastIndexOf("-");
    const cleanTitle = article.title.substring(0, cutOff - 1);
    let newsImage = (article.urlToImage === null) ? logo : article.urlToImage;

    return (
        <div
            className="news-tile"
        >
            {/*Indien er geen afbeeldingslink meegegeven is, een standaard afbeelding gebruiken*/}
            {article.urlToImage ? <img src={newsImage} alt={article.title} className="tile-image"/> :
                <img src={logo} alt="App logo" className="tile-image"/>}

            <article className="tile-text">
                <div id="tile-title">
                    <h2>{cleanTitle}</h2>
                </div>
                <div className="align-right">
                    <p id="pubDatum">
                        {dateNotation(article.publishedAt)}
                    </p>
                </div>
                <div id="tile-description">
                    <p>{clipText(article.description, 125)}</p>
                    {/*<p>{article.description}</p>*/}
                </div>
                <p id="tile-source">{article.source.name}</p>
            </article>
        </div>
    );
}

export default NewsTile;