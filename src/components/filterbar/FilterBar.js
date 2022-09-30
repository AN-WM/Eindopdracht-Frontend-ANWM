import React, {useEffect, useState} from 'react';
import FilterBlock from "../filterblock/FilterBlock";
import createList from "../../helpers/createList";
import './FilterBar.css'

function FilterBar({filterList, setFilterList, input, searchParams, setSearchParams, toggleError, setErrorMessage}) {
    const [domainList, setDomainList] = useState([]);
    const {searchType, searchQuery} = Object.fromEntries([...searchParams]);

    useEffect(() => {
        if (filterList.length === 0) {
            if (input !== undefined && input.length !== 0) {
                const newDomains = createList(input, 'domain')
                setDomainList(newDomains);
                setFilterList(newDomains);
            }
        } else {
            setDomainList(filterList);
        }
            // eslint-disable-next-line
        }, []
    );

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