import React from 'react';
import FilterBlock from "../filterblock/FilterBlock";
import './FilterBar.css'

function FilterBar({searchType, input, totalResults}) {

    // console.log(input);
    //
    // let sourceList = new Set();
    // let authorList = new Set();
    //
    // for (let x = 0; x <= (totalResults - 1); x++) {
    //     // console.log(input[x].author);
    //     let author = input[x].author;
    //     // console.log(author);
    //     authorList.add(author);
    //     // if (input[x].source.name !== undefined) {
    //     // sourceList.add(input[x].source.name);}
    //     // authorList.add(input[x].author);
    // }
    // //
    // // console.log(sourceList);
    // console.log(authorList);

    return (
        <div className="filter-bar">
            <FilterBlock
                blockType="date"
                input="input"
            />

            {searchType === 'article' &&
                <FilterBlock
                    blockType="source"
                    input="input"
                />}

            {searchType === 'article' &&
                <FilterBlock
                blockType="language"
                input="input"
                />
            }

            <FilterBlock
                blockType="author"
                input="input"
            />

            <FilterBlock
                blockType="sort"
                input="input"
            />
        </div>
    );
}

export default FilterBar;