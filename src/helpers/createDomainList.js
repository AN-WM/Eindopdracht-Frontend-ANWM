import createList from "./createList";

async function createDomainList(input, searchQuery, searchType, setDomainList, setFilterList, oldParams, setOldParams) {
    if (input !== undefined && input.length !== 0) {
        const newDomains = await createList(input, 'domain')
        if (newDomains.length > 0) {
            setDomainList(newDomains);
            setFilterList(newDomains);
            setOldParams({
                ...oldParams,
                searchQuery: searchQuery,
                searchType: searchType,
            })
        } else {
            console.log("CreateDomainList ging mis")
        }
    } else {
        console.log("CreateDomainList had geen input")
    }
}

export default createDomainList;