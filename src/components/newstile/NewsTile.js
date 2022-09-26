import React from 'react';
import './Newstile.css';
import logo from "../../assets/News logo icon.png";
import clipText from "../../helpers/clipText";
import dateNotation from "../../helpers/dateNotation";

function NewsTile({article, error, toggleError}) {
    let cutOff = 0;
    let cleanTitle = article.title;
    if (article.title !== null) {
        cutOff = article.title.lastIndexOf(" - ");
        cleanTitle = (cutOff >= 0) ? article.title.substring(0, cutOff - 1) : article.title;
    }

    return (
        <a
            href={article.url}
            className="news-tile"
            target="_blank"
            rel="noreferrer"
        >
            {/*Use standard image when no news image is provided*/}
            {article.urlToImage ? <img src={article.urlToImage} alt={article.title} className="tile-image"/> :
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
                </div>
                <p id="tile-source">{article.source.name}</p>
            </article>
        </a>
    );
}

export default NewsTile;