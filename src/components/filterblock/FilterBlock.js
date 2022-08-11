import React, {useState} from 'react';
import './FilterBlock.css';

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

let briefLanguageArray = languageArray.slice(0, 5);

// Date
// Source    - Uit bron
// Language  -
// Author      Uit bron
// Sort by

function CreateBlock(blockType, inputList) {
    const [languageBrief, toggleLanguageBrief] = useState(false);
    const [authorBrief, toggleAuthorBrief] = useState(false);
    const [sourceBrief, toggleSourceBrief] = useState(false);

    switch (blockType) {
        case 'date':
            // code block
            return <p>Ik ben een datum</p>;
        case 'source':
            // code block
            return <p>Ik ben een bron</p>;
        case 'language':
            return (languageBrief === false ?
                //Basis array van talen, met knop om meer talen te tonen.
                <div className="filterBlock">
                    {briefLanguageArray.map((input) => {
                        return (
                            <div className="select-option">
                                <input
                                    type="checkbox"
                                    id={input.language}
                                    name={input.language}
                                    value={input.language}
                                />
                                <label
                                    htmlFor={input.language}
                                >
                                    {input.full}
                                </label>
                            </div>
                        )
                    })}

                    <button
                        type="button"
                        className="see-more"
                        onClick={() => toggleLanguageBrief(!languageBrief)}
                    >
                        See more
                    </button>
                </div>
                :
                //Uitgebreide array van talen, met knop om minder opties te tonen.
                <div className="filterBlock">
                    {languageArray.map((input) => {
                        return (
                            <div className="select-option">
                                <input type="checkbox" id={input.language} name={input.language}
                                       value={input.language}/>
                                <label htmlFor={input.language}>{input.full}</label>
                            </div>
                        )
                    })}

                    <button
                        type="button"
                        className="see-more"
                        onClick={() => toggleLanguageBrief(!languageBrief)}
                    >
                        See less
                    </button>
                </div>);

        case
        'author'
        :
            //code block
            if (inputList !== undefined) {
                let briefList = inputList.slice(0, 5);
                return (authorBrief === false ?
                    //Basic author list, with button to show more
                    <div className="filterBlock">
                        {briefList.map((input) => {
                            return (
                                <div className="select-option">
                                    <input
                                        type="checkbox"
                                        id={input}
                                        name={input}
                                        value={input}
                                    />
                                    <label
                                        htmlFor={input}
                                    >
                                        {input}
                                    </label>
                                </div>
                            )
                        })}

                        <button
                            type="button"
                            className="see-more"
                            onClick={() => toggleAuthorBrief(!authorBrief)}
                        >
                            See more
                        </button>
                    </div>
                    :
                    //Uitgebreide array van talen, met knop om minder opties te tonen.
                    <div className="filterBlock">
                        {inputList.map((input) => {
                            return (
                                <div className="select-option">
                                    <input type="checkbox" id={input} name={input}
                                           value={input}/>
                                    <label htmlFor={input}>{input}</label>
                                </div>
                            )
                        })}

                        <button
                            type="button"
                            className="see-more"
                            onClick={() => toggleAuthorBrief(!authorBrief)}
                        >
                            See less
                        </button>
                    </div>
                );
            } break;
        case
        'sort'
        :
            //code block
            return <p>Ik ben een sorteerkeuze</p>;
        default:
        // code block
    }
}

function FilterBlock({blockType, inputList}) {
    return (
        <>
            <h3>{blockType}</h3>
            {CreateBlock(blockType, inputList)}
        </>
    );
}

export default FilterBlock;