import React from 'react';
import './FilterBlock.css';
import NewsTile from "../newstile/NewsTile";

let languageArray = [{
    language: "ar",
    full: "Arabic"
}, {
    language: "de",
    full: "German"
}, {
    language: "en",
    full: "English"
}, {
    language: "es",
    full: "Spanish"
}, {
    language: "fr",
    full: "French"
}, {
    language: "he",
    full: "Hebrew"
}, {
    language: "it",
    full: "Italian"

}, {
    language: "nl",
    full: "Dutch"
}, {
    language: "no",
    full: "Norwegian"
}, {
    language: "pt",
    full: "Portugese"
}, {
    language: "ru",
    full: "Russian"
}, {
    language: "sv",
    full: "Swedish"
}, {
    language: "zh",
    full: "Chinese"
}]

// Date
// Source    - Uit bron
// Language  -
// Author      Uit bron
// Sort by

function createBlock(blockType) {
    switch (blockType) {
        case 'date':
            // code block
            return <p>Ik ben een datum</p>;
        case 'source':
            // code block
            return <p>Ik ben een bron</p>;
        case 'language':
            return <div className="filterBlock">
                {languageArray.map((input) => {
                    return (
                        <div className="select-option">
                            <input type="checkbox" id={input.language} name={input.language} value={input.language}/>
                            <label htmlFor={input.language}>{input.full}</label>
                        </div>
                    )
                })
                }
            </div>;
        case 'author':
            //code block
            return <p>Ik ben een auteur</p>;
        case 'sort':
            //code block
            return <p>Ik ben een sorteerkeuze</p>;
        default:
        // code block
    }
}

function FilterBlock({blockType, input}) {
    return (
        <>
            <h3>{blockType}</h3>
            {createBlock(blockType)}
        </>
    );
}

export default FilterBlock;