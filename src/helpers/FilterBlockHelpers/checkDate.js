function checkDate(changeType, startDate, endDate, toggleError, setErrorMessage) {
    toggleError(false);

    if (startDate > endDate) {
        toggleError(true);
        setErrorMessage("'From'-date can't be before 'To'-date, please adjust either");
        return "error";
    } else {
        if (changeType === "start") {
            const date = new Date()
            date.setMonth(date.getMonth() - 2)
            if (date.toISOString().split('T')[0] > startDate) {
                toggleError(true);
                setErrorMessage("Please select a 'From'-date within the last month");
                return "error";
            } else {
                return startDate
            }
        } else if (changeType === "end") {
            return endDate;
        }

    }

}

export default checkDate