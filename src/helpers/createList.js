function CreateList(input, type) {
    let newItem = false;
    const domainList = [];

    function addDomain(fullUrl) {
        const shortUrl = clipUrl(fullUrl);
        newItem = false;
        newItem = checkDoubleDomain(shortUrl);
        !newItem && domainList.push(shortUrl);
    }

    function clipUrl(fullUrl) {
        let startPoint = 0;

        //Check for domains that start with www
        const wwwCheck = fullUrl.includes("www.");

        //Decide on starting point, based on www or not
        if (wwwCheck) {
            startPoint = fullUrl.indexOf("www.") + 4;
        } else {
            startPoint = fullUrl.indexOf("//") + 2;
        }

        //Clip the first part of the url
        const stepOne = fullUrl.substring(startPoint);
        //Find the end of the domain
        const endpoint = stepOne.indexOf("/");
        //Clip the last part of the url, so only the domain remains
        const stepTwo = stepOne.substring(0, endpoint);

        //Some domains have a prefix, separated with a dot. To find them, find out whether the domain has an extra dot.
        const firstDot = stepTwo.indexOf(".");
        const lastDot = stepTwo.lastIndexOf(".");

        //Some countries do use double extension, I can't filter them all manually, so I only hard code the two main ones.
        const english = stepTwo.includes("co.uk");
        const australian = stepTwo.includes(".com.au");

        //If there are no two dots, or the country of origin is English or Australian, leave the domain as-is.
        if ( firstDot === lastDot || english || australian) {
            return stepTwo;
        }
        //Otherwise, clip the url further, to make sure only the domain remains.
        else {
            return stepTwo.substring(firstDot + 1);
        }
    }

    function checkDoubleDomain(item) {
        for (let i = 0; i < domainList.length; i++) {
            //Only add a value to the list if it doesn't exist in the list already, and if it has an id
            if (domainList[i] === item) {
                return true;
            }
        }
        return false
    }

    //Create list of unique domains
    if (type === 'domain') {
        input.forEach((input) => {
            addDomain(input.url);
        });

        //Put list in alphabetical order
        domainList.sort();
        return domainList;

        //If no type was provided, provide a console log
    } else {
        console.log('Geen correct type ontvangen, kan geen lijst maken')
    }
}

export default CreateList;