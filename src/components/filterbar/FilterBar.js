import React, {useEffect, useState} from 'react';
import FilterBlock from "../filterblock/FilterBlock";
import createList from "../../helpers/createList";
import './FilterBar.css'

function FilterBar({
                       filterList,
                       setFilterList,
                       oldParams,
                       setOldParams,
                       input,
                       searchParams,
                       setSearchParams,
                       toggleError,
                       setErrorMessage
                   }) {
    const [domainList, setDomainList] = useState([]);
    const {searchType, searchQuery} = Object.fromEntries([...searchParams]);

    useEffect(() => {
            // When a new search occurs
            if (filterList.length === 0 || oldParams.searchQuery !== searchQuery || oldParams.searchType !== searchType) {
                if (input !== undefined && input.length !== 0) {
                    const newDomains = createList(input, 'domain')
                    setDomainList(newDomains);
                    setFilterList(newDomains);
                    setOldParams({
                        searchQuery: searchQuery,
                        searchType: searchType
                    })
                }
            } else {
                setDomainList(filterList);
            }
        // eslint-disable-next-line
        }, []
    );

    useEffect(() => {
        setDomainList(filterList);
    // eslint-disable-next-line
    }, [searchParams])

    return (
        <div
            className="filter-bar"
        >

            <FilterBlock
                blockType="date"
                input="input"
                searchParams={searchParams}
                setSearchParams={setSearchParams}
                toggleError={toggleError}
                setErrorMessage={setErrorMessage}
            />

            {searchType === 'article' &&
                <FilterBlock
                    blockType="source"
                    inputList={domainList}
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    toggleError={toggleError}
                    setErrorMessage={setErrorMessage}
                />}

            {searchType === 'article' &&
                <FilterBlock
                    blockType="language"
                    inputList="input"
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    toggleError={toggleError}
                    setErrorMessage={setErrorMessage}
                />
            }

            <FilterBlock
                blockType="sort"
                input="input"
                searchParams={searchParams}
                setSearchParams={setSearchParams}
                toggleError={toggleError}
                setErrorMessage={setErrorMessage}
            />
        </div>
    );
}

export default FilterBar;