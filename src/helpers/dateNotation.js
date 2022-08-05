function dateNotation(date) {

    //Zet datum om in dd-mm-yyyy
    const cleanDate = new Date(date).toLocaleDateString('nl-NL', 'CET');
    //Zet tijd om in uu:mm, Nederlandse tijd
    const cleanTime = new Date(date).toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' });
    return cleanTime + " " + cleanDate;

}

export default dateNotation;