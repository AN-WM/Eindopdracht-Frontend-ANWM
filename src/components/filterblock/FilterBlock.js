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

function CreateBlock(blockType, inputList) {
    const [languageBrief, toggleLanguageBrief] = useState(false);
    const [authorBrief, toggleAuthorBrief] = useState(false);
    const [sourceBrief, toggleSourceBrief] = useState(false);

    switch (blockType) {
        case 'date':
            return <div className="filter-block">
                <h3>Date</h3>

                <label className="date-label">
                    From:
                    <input
                        type="date"
                        id="date-start"
                        name="date-start"
                    />
                </label>

                <label className="date-label">
                    To:
                    <input
                        type="date"
                        id="date-end"
                        name="date-end"
                    />
                </label>
            </div>;

        case 'source':
            if (inputList !== undefined) {
                let briefList = inputList.slice(0, 5);
                return (sourceBrief === false ?
                        //Basic source list, with button to show more
                        <div className="filter-block">
                            <h3>Source</h3>

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
                                onClick={() => toggleSourceBrief(!sourceBrief)}
                            >
                                See more
                            </button>
                        </div>
                        :
                        //Full source list, with button to show less
                        <div className="filter-block">
                            <h3>Source</h3>

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
                                className="see-less"
                                onClick={() => toggleSourceBrief(!sourceBrief)}
                            >
                                See less
                            </button>
                        </div>
                );
            }
            break;

        case 'language':
            return (languageBrief === false ?
                //Basis array van talen, met knop om meer talen te tonen.
                <div className="filter-block">
                    <h3>Language</h3>

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
                <div className="filter-block">
                    <h3>Language</h3>

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
                        className="see-less"
                        onClick={() => toggleLanguageBrief(!languageBrief)}
                    >
                        See less
                    </button>
                </div>);

        case 'author':
            if (inputList !== undefined) {
                let briefList = inputList.slice(0, 5);
                return (authorBrief === false ?
                        //Basic author list, with button to show more
                        <div className="filter-block">
                            <h3>Author</h3>

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
                        //Full author list, with button to show less
                        <div className="filter-block">
                            <h3>Author</h3>

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
                                className="see-less"
                                onClick={() => toggleAuthorBrief(!authorBrief)}
                            >
                                See less
                            </button>
                        </div>
                );
            }
            break;

        case 'sort':
            return <div className="filter-block">
                <h3>Sort by</h3>

                <select name="sort" id="sort">
                    <option value="date">Newest first</option>
                    <option value="relevance">Relevancy</option>
                    <option value="popularity">Popularity</option>
                </select>
            </div>;

        default:
            console.error("No (known) blocktype selected");
    }
}

function FilterBlock({blockType, inputList}) {
    return (
        <>
            {CreateBlock(blockType, inputList)}
        </>
    );
}

export default FilterBlock;