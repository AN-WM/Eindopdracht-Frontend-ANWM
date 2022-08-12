import React, {useEffect, useState} from 'react';
import FilterBlock from "../filterblock/FilterBlock";
import './FilterBar.css'
import createList from "../../helpers/createList";

function FilterBar({searchType, input}) {
    const [authorList, setAuthorList] = useState();
    const [sourceList, setSourceList] = useState();

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