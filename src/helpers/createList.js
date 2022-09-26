function CreateList(input, type) {
    let authorList = new Set();
    const sourceList = [];
    let [sourceName, sourceId] = sourceList;
    let authorReturnList = [];
    let newItem = false;

    function AddAuthor(item) {
        item !== null && authorList.add(item);
    }

    function AddSource(item, id) {
        newItem = false;
        newItem = checkDoubles(item, id);
        !newItem && sourceList.push({sourceName: item, sourceId: id});
    }

    function checkDoubles(item, id) {
        for (let i = 0; i < sourceList.length; i++) {
            const {sourceName, sourceId} = sourceList[i];
            //Only add a value to the list if it doesn't exist in the list already, and if it has an id
            if ((sourceName === item && sourceId === id) || id === null) {
                return true;
            }
        }
        return false
    }

    function sortSourceList() {
        sourceList.sort((a, b) => {
            let sourceA = a.sourceName.toLowerCase(),
                sourceB = b.sourceName.toLowerCase();

            if (sourceA < sourceB) {
                return -1;
            } else if (sourceA > sourceB) {
                return 1;
            } else {
                return 0
            }
        });
    }

    //Create list of unique authors
    if (type === 'author') {
        input.forEach((input) => {
            AddAuthor(input.author);
        });

        authorReturnList = Array.from(authorList);
        authorReturnList.sort();
        return authorReturnList;

    //Create list of unique sources
    } else if (type === 'source') {
        input.forEach((input) => {
            AddSource(input.source.name, input.source.id);
        });

        //Put list in alphabetical order, based on Item
        sortSourceList();

        return sourceList;

    //If no type was provided, provide a console log
    } else {
        console.log('Geen correct type ontvangen, kan geen lijst maken')
    }
}

export default CreateList;