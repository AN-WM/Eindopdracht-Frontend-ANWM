import React, {createContext, useState} from 'react';

export const SearchContext = createContext({});

function SearchContextProvider({children}) {
    const [searchValue, setSearchValue] = useState({
        searchTerm: 'Test',
        searchType: 'article',
        startDate: '',
        endDate: '',
        sourceId: '',
        language: '',
        author: '',
        sort: ''
    });

    function submitSearchValue(searchInput, searchType, startDate, endDate, sourceId, language, author, sort) {
        setSearchValue({
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
        searchValue,
        searchFunction: submitSearchValue
    }

    return (
        <SearchContext.Provider value={data}>
            {children}
        </SearchContext.Provider>
    )
}

export default SearchContextProvider;