import React, {useEffect, useState} from 'react';
import FilterBlock from "../filterblock/FilterBlock";
import createDomainList from "../../helpers/createDomainList";
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
    const {searchType, searchQuery, language} = Object.fromEntries([...searchParams]);

    useEffect(() => {
        if (input && input.length > 0) {
            // When a new search occurs
            if (filterList.length === 0
                || oldParams.searchQuery !== searchQuery
                || oldParams.searchType !== searchType
                || oldParams.language !== language) {
                createDomainList(input, searchQuery, searchType, setDomainList, setFilterList, oldParams, setOldParams);
            // In case of changes outside of filter list
            } else {
                setDomainList(filterList);
            }
        }
        // eslint-disable-next-line
    }, [input, searchParams]);

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