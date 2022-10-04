import React, {useState} from 'react';
import updateFilters from "../../helpers/FilterBlockHelpers/updateFilters";
import checkDate from "../../helpers/FilterBlockHelpers/checkDate";
import './FilterBlock.css';

let languageArray = [{
    language: "",
    full: "All"
}, {
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

function CreateBlock(blockType, inputList, searchParams, setSearchParams, toggleError, setErrorMessage) {
    const [languageBrief, toggleLanguageBrief] = useState(false);
    const [sourceBrief, toggleSourceBrief] = useState(false);
    const {sourceId, startDate, endDate} = Object.fromEntries([...searchParams]);


    function handleChange(e, filter) {
        const oldParams = Object.fromEntries([...searchParams]);
        switch (filter) {
            case 'date':
                let dateValue = '';
                let processedDate = '';

                if (e === "start") {
                    dateValue = document.getElementById("dateStart").value;
                    processedDate = checkDate("start", dateValue, endDate, toggleError, setErrorMessage)
                    processedDate !== "error" &&
                        setSearchParams({
                            ...oldParams,
                            startDate: processedDate
                        })
                } else if (e === "end") {
                    dateValue = document.getElementById("dateEnd").value;
                    processedDate = checkDate("end", startDate, dateValue, toggleError, setErrorMessage);
                    processedDate !== "error" &&
                        setSearchParams({
                            ...oldParams,
                            endDate: processedDate
                        })
                }
                break;
            case 'source':
                setSearchParams({
                    ...oldParams,
                    sourceId: updateFilters(sourceId, e.input)
                })
                break;
            case 'language':
                setSearchParams({
                    ...oldParams,
                    language: e.input.language
                })
                break;
            case 'sort':
                const sortValue = document.getElementById("sort").value;
                setSearchParams({
                    ...oldParams,
                    sortValue: sortValue
                })
                break;
            default:
                console.log("No filtertype selected");
        }
    }

    switch (blockType) {
        case 'date':
            return <div className="filter-block">
                <h3>Date</h3>

                <label className="date-label">
                    From:
                    <input
                        type="date"
                        id="dateStart"
                        defaultValue={startDate}
                        onChange={() => handleChange("start", "date")}
                    />
                </label>

                <label className="date-label">
                    To:
                    <input
                        type="date"
                        id="dateEnd"
                        defaultValue={endDate}
                        onChange={() => handleChange("end", "date")}
                    />
                </label>
            </div>;

        case 'source':
            if (inputList !== undefined) {
                if (inputList.length > 5) {
                    let briefList = inputList.slice(0, 5);
                    return (sourceBrief === false ?
                            //Basic source list, with button to show more
                            <div className="filter-block">
                                <h3>Source</h3>
                                {briefList.map((input) => {
                                    return (
                                        <div
                                            className="select-option"
                                            key={input}
                                        >
                                            <input
                                                type="checkbox"
                                                id={input}
                                                name={input}
                                                value={input}
                                                onChange={() => handleChange({input}, "source")}
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
                                        <div
                                            className="select-option"
                                            key={input}
                                        >
                                            <input
                                                type="checkbox"
                                                id={input}
                                                name={input}
                                                value={input}
                                                onChange={() => handleChange({input}, "source")}
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
                                    className="see-less"
                                    onClick={() => toggleSourceBrief(!sourceBrief)}
                                >
                                    See less
                                </button>
                            </div>
                    );
                } else {
                    return <div className="filter-block">
                        <h3>Source</h3>
                        {inputList.map((input) => {
                            return (
                                <div
                                    className="select-option"
                                    key={input}
                                >
                                    <input
                                        type="checkbox"
                                        id={input}
                                        name={input}
                                        value={input}
                                        onChange={() => handleChange({input}, "source")}
                                    />

                                    <label
                                        htmlFor={input}
                                    >
                                        {input}
                                    </label>
                                </div>
                            )
                        })}
                    </div>
                }
            }
            break;

        case 'language':
            return (languageBrief === false ?
                //Basis array van talen, met knop om meer talen te tonen.
                <div className="filter-block">
                    <h3>Language</h3>

                    {briefLanguageArray.map((input) => {
                        return (
                            <div
                                className="select-option"
                                key={input.language}
                            >
                                <input
                                    type="radio"
                                    id={input.language}
                                    name="language"
                                    value={input.language}
                                    onChange={() => handleChange({input}, "language")}
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
                            <div
                                className="select-option"
                                key={input.language}
                            >
                                <input
                                    type="radio"
                                    id={input.language}
                                    name="language"
                                    value={input.language}
                                    onChange={() => handleChange({input}, "language")}
                                />

                                <label htmlFor={input.language}>
                                    {input.full}
                                </label>
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

        case 'sort':
            return <div className="filter-block">
                <h3>Sort by</h3>

                <select
                    name="sort"
                    id="sort"
                    onChange={() => handleChange("empty", "sort")}
                >
                    <option value="">Select option</option>
                    <option value="publishedAt">Newest first</option>
                    <option value="relevancy">Relevancy</option>
                    <option value="popularity">Popularity</option>
                </select>
            </div>;

        default:
            console.error("No (known) blocktype selected");
    }
}

function FilterBlock({blockType, inputList, searchParams, setSearchParams, toggleError, setErrorMessage}) {
    return (
        <>
            <form>
                {CreateBlock(blockType, inputList, searchParams, setSearchParams, toggleError, setErrorMessage)}
            </form>
        </>
    );
}

export default FilterBlock;