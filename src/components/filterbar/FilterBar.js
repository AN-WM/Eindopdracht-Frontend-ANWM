import React, {useContext, useEffect, useState} from 'react';
import FilterBlock from "../filterblock/FilterBlock";
import createList from "../../helpers/createList";
import {SearchContext} from "../../context/SearchContext";
import './FilterBar.css'

function FilterBar({input}) {
    const [authorList, setAuthorList] = useState([]);
    const [sourceList, setSourceList] = useState([]);
    const {searchParameter: {searchType, searchTerm}, sourceArray, setSourceArray} = useContext(SearchContext);

    useEffect(() => {
            if (input !== undefined) {
                //If there's no sourceArray in SearchContext
                console.log(searchTerm);
                console.log(input);
                console.log(sourceArray.length);
                console.log(sourceArray);
              // if (sourceArray.length <= 0) {
              //       setSourceList(createList(input, 'source'));
              //       setSourceArray(sourceList);
              //   }
              //   else {
              //       setSourceList(sourceArray);
              //   }
                setSourceList(createList(input, 'source'));
                setAuthorList(createList(input, 'author'));
            }
        }, [searchType, searchTerm]
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
                    inputList={sourceList}
                />}

            {searchType === 'article' &&
                <FilterBlock
                    blockType="language"
                    inputList="input"
                />
            }

            {/*<FilterBlock*/}
            {/*    blockType="author"*/}
            {/*    inputList={authorList}*/}
            {/*/>*/}

            <FilterBlock
                blockType="sort"
                input="input"
            />
        </div>
    );
}

export default FilterBar;