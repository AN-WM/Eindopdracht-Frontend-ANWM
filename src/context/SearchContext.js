import React, {createContext, useState} from 'react';

export const SearchContext = createContext({});

function SearchContextProvider({children}) {
    const [searchValue, setSearchValue] = useState({
        searchTerm: 'Test',
        searchType: 'article'
    });

    function submitSearchValue(searchInput, searchType) {
        setSearchValue({
            searchTerm: searchInput,
            searchType: searchType
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