import React from 'react';
import './Searchbar.css';

function Searchbar({inputType}) {
    const [searchValue, setSearchValue] = React.useState('');
    const [searchType, setSearchType] = React.useState(inputType);

    const handleChange = e => {
        const target = e.target;
        if (target.checked) {
            setSearchType(target.value);
        }
    };

    function onFormSubmit(e) {
        e.preventDefault();
        console.log("Ik ga zoeken naar:");
        console.log(searchValue);
        console.log("en het type is:")
        console.log(searchType);
    }

    return (
        <form
            className="search-form"
            onSubmit={onFormSubmit}
        >
            <div className="search-bar-container">
                <div className="search-container-left">
                    <input
                        type="text"
                        id="search-bar"
                        placeholder="Search the news"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />

                    <div className="radio-group">
                        <input
                            type="radio"
                            id="article"
                            name="search-type"
                            checked= {searchType === 'article'}
                            value="article"
                            onChange={handleChange}
                        />
                        <label
                            htmlFor="article"
                        >
                            Find article
                        </label>

                        <input
                            type="radio"
                            id="source"
                            name="search-type"
                            checked= {searchType === 'source'}
                            value="source"
                            onChange={handleChange}
                        />
                        <label
                            htmlFor="source"
                        >
                            Find source
                        </label>
                    </div>
                </div>

                <button
                    id="search-button"
                    type="submit"
                >
                    Search
                </button>
            </div>


        </form>
    );
}

export default Searchbar;