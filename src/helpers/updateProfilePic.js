import axios from "axios";

async function updateProfilePic(data, toggleError, token) {
    try {
        const result = await axios.put(`https://frontend-educational-backend.herokuapp.com/api/user/image`, {
                "base64Image": "BASE64-string",
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

export default updateProfilePic;
