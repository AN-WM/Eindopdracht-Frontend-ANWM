import React from 'react';
import './Newstile.css';

function NewsTile({article, key, error, toggleError}) {
    const cutOff = article.title.lastIndexOf("-");
    const cleanTitle = article.title.substring(0, cutOff - 1);

    return (
        <div
            className="news-tile"
        >
            <img src={article.urlToImage} alt={article.title} className="tile-image"/>
            <h2>{cleanTitle}</h2>
            <p
                className="pubDatum"
            >
                {article.publishedAt}
            </p>
            <p>{article.description}</p>
            <p>{article.source.name}</p>
        </div>
    );
}

export default NewsTile;