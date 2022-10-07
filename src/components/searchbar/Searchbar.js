import React from 'react';
import {useNavigate, createSearchParams} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import './Searchbar.css';

function Searchbar({placeHolder, searchType}) {
    const navigate = useNavigate();
    const {handleSubmit, register} = useForm({
        defaultValues: {
            'searchInput': placeHolder || '',
            'searchType': searchType || 'article',
        }
    });

    function onFormSubmit(formData) {
        const params = {
            searchType: formData.searchType,
            searchQuery: formData.searchInput,
            sourceId: '',
            language: ''
        };

        navigate({
            pathname: '/search-results/',
            search: `${createSearchParams(params)}`,
        });
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
                        placeholder={placeHolder ? placeHolder : "Search the news"}
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