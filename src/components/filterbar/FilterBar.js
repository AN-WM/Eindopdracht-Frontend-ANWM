import React, {useContext, useEffect, useState} from 'react';
import FilterBlock from "../filterblock/FilterBlock";
import createList from "../../helpers/createList";
import {SearchContext} from "../../context/SearchContext";
import './FilterBar.css'

function FilterBar({input}) {
    const [domainList, setDomainList] = useState([]);
    const {searchParameter: {searchType, searchTerm}, sourceArray, setSourceArray} = useContext(SearchContext);

    useEffect(() => {
            if (input !== undefined) {
                setDomainList(createList(input, 'domain'));
            }
        }, [input]
    );

    return (
        <div
            className="filter-bar"
        >
            <FilterBlock
                blockType="date"
                input="input"
            />

            {searchType === 'article' &&
                <FilterBlock
                    blockType="source"
                    inputList={domainList}
                />}

            {searchType === 'article' &&
                <FilterBlock
                    blockType="language"
                    inputList="input"
                />
            }

            <FilterBlock
                blockType="sort"
                input="input"
            />
        </div>
    );
}

export default FilterBar;