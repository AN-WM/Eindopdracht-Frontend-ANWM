import React, {useContext, useEffect, useState} from 'react';
import FilterBlock from "../filterblock/FilterBlock";
import './FilterBar.css'
import createList from "../../helpers/createList";
import {SearchContext} from "../../context/SearchContext";

function FilterBar({input}) {
    const [authorList, setAuthorList] = useState();
    const [sourceList, setSourceList] = useState();
    const {searchValue: {searchType}} = useContext(SearchContext);

    useEffect(() => {
            if (input !== undefined) {
                setAuthorList(createList(input, 'author'));
                setSourceList(createList(input, 'source'));
            }
        }, [input]
    )

    return (
        <div className="filter-bar">
            <FilterBlock
                blockType="date"
                input="input"
            />

            {searchType === 'article' &&
                <FilterBlock
                    blockType="source"
                    inputList={sourceList}
                />}

            {searchType === 'article' &&
                <FilterBlock
                    blockType="language"
                    inputList="input"
                />
            }

            <FilterBlock
                blockType="author"
                inputList={authorList}
            />

            <FilterBlock
                blockType="sort"
                input="input"
            />
        </div>
    );
}

export default FilterBar;