function CreateList(input, type) {
    let authorList = new Set();
    let sourceList = new Set();
    let authorReturnList = [];
    let sourceReturnList = [];

    function AddAuthor(item) {
        item !== null && authorList.add(item);
    }

    function AddSource(item) {
        item !== null && sourceList.add(item);
    }

    //Create list of unique authors
    if (type === 'author') {
        input.map((input) => {
            AddAuthor(input.author);
        });

        authorReturnList = Array.from(authorList);
        authorReturnList.sort();
        return authorReturnList;

    //Create list of unique sources
    } else if (type === 'source') {
        input.map((input) => {
            AddSource(input.source.name);
        });
        sourceReturnList = Array.from(sourceList);
        sourceReturnList.sort();
        return sourceReturnList;
    } else {
        console.log('Geen correct type ontvangen, kan geen lijst maken')
    }
}

export default CreateList;