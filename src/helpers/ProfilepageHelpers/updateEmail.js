import axios from "axios";

async function updateEmail(newEmail, toggleError, token) {
    try {
        const result = await axios.put(`https://frontend-educational-backend.herokuapp.com/api/user`, {
                "email": `${newEmail}`,
            }, {headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                }}
        );
        toggleError(false);
        return result.status;
    } catch (e) {
        console.log(e);
        toggleError(true);
    }
}

export default updateEmail;
