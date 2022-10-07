import axios from "axios";

async function updatePassword(data, toggleError, token) {
    try {
        const result = await axios.put(`https://frontend-educational-backend.herokuapp.com/api/user`, {
                "password": `${data.password}`,
                "repeatedPassword": `${data.confirmPassword}`,
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

export default updatePassword;
