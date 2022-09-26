import React, {createContext, useState} from 'react';

export const SearchContext = createContext({});

function SearchContextProvider({children}) {
    const [searchParameter, setSearchParameter] = useState({
        searchTerm: 'Test',
        searchType: 'article',
        startDate: "",
        endDate: "",
        sourceId: "",
        language: "",
        author: "",
        sort: ""
    });
    const [filterArray, setFilterArray] = useState([]);
    const [sourceArray, setSourceArray] = useState([]);

    function submitSearchParameter(searchInput, searchType, startDate, endDate, sourceId, language, author, sort) {
        setSearchParameter({
            searchTerm: searchInput,
            searchType: searchType,
            startDate: startDate,
            endDate: endDate,
            sourceId: sourceId,
            language: language,
            author: author,
            sort: sort
        });
    }

    const data = {
        searchParameter,
        setSearchParameter,
        searchFunction: submitSearchParameter,
        sourceArray,
        setSourceArray,
        filterArray,
        setFilterArray,
    }

    return (
        <SearchContext.Provider value={data}>
            {children}
        </SearchContext.Provider>
    )
}

export default SearchContextProvider;