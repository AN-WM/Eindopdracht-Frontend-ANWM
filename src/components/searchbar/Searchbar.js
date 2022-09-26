import React, {useContext} from 'react';
import {useForm} from 'react-hook-form';
import {SearchContext} from "../../context/SearchContext";
import {useNavigate} from 'react-router-dom';
import './Searchbar.css';

function Searchbar() {
    const {searchParameter: {searchTerm, searchType}, searchFunction} = useContext(SearchContext);
    const navigate = useNavigate();
    const {handleSubmit, register} = useForm({
        defaultValues: {
            searchTerm: searchTerm,
            searchType: searchType
        }
    });

    function onFormSubmit(formData) {
        //Put search details in context
        searchFunction(formData.searchInput, formData.searchType);

        //Navigate to the search results
        navigate('/search-results');
    }

    return (
        <form
            className="search-form"
            onSubmit={handleSubmit(onFormSubmit)}
        >
            <div className="search-bar-container">
                <div className="search-container-left">
                    <input
                        type="text"
                        className="input-bar"
                        placeholder="Search the news"
                        {...register("searchInput")}
                    />

                    <div className="radio-group">
                        <label>
                            <input
                                type="radio"
                                value="article"
                                {...register("searchType", {required: true})}
                            />

                            Find article
                        </label>

                        <label>
                            <input
                                type="radio"
                                value="source"
                                {...register("searchType", {required: true})}
                            />

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