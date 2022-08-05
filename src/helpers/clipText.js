function clipText(title, limit) {

    //de eerste check is nodig om de description te kunnen clippen
    if (typeof title === 'string' && title.length > limit) {
        return title.substring(0, limit) + "...";
    } else return title;

}

export default clipText;