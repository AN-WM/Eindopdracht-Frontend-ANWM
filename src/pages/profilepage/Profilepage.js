import React, {useContext, useState} from 'react';
import {AuthContext} from "../../context/AuthContext";
import {useForm} from "react-hook-form";
import Header from "../../components/header/Header";
import Searchbar from "../../components/searchbar/Searchbar";
import updatePassword from "../../helpers/ProfilepageHelpers/updatePassword";
import updateEmail from "../../helpers/ProfilepageHelpers/updateEmail";
import updateCountry from "../../helpers/ProfilepageHelpers/updateCountry";
import profilepic from "../../assets/Generic profile pic change.png";
import "./Profilepage.css";

function Profilepage({searchtype}) {
    const [error, toggleError] = useState(false);
    const {authState: {userName, userEmail, userCountry}, fetchUserFunction} = useContext(AuthContext);
    const {handleSubmit, formState: {errors}, register, watch} = useForm();
    const token = localStorage.getItem('token');
    const [updateMessage, toggleUpdateMessage] = useState(false);

    async function onFormSubmit(data) {
        toggleUpdateMessage(false);

        //Update password, if new password has been entered
        if (data.password !== undefined && data.password !== "") {
            const passwordResponse = await updatePassword(data, toggleError, token);
            if (passwordResponse === 200) {
                fetchUserFunction(token);
                toggleUpdateMessage(true);
            }
        }

        //Update email, if new email has been entered
        if (data.email !== undefined && data.email !== "") {
            const emailResponse = await updateEmail(data.email, toggleError, token);
            if (emailResponse === 200) {
                fetchUserFunction(token);
                toggleUpdateMessage(true);
            }
        }

        //Update country, if new country has been entered
        if (data.country !== undefined && data.country !== "") {
            const countryResponse = await updateCountry(data.country, toggleError, token);
            if (countryResponse === 200) {
                fetchUserFunction(token);
                toggleUpdateMessage(true);
            }
        }
    }

    return (
        <>
            <Header
                page='profile'
            />

            <Searchbar
                inputType={searchtype}
            />

            <img src={profilepic} alt="Profile pic" className="profile-picture"/>

            <h1>Profile</h1>

            {error &&
                <h4 className="error-message">Unable to fetch profile data</h4>
            }

            {updateMessage &&
                <h4 className="success-message">Profile has been updated</h4>
            }

            <form
                className="profile-form"
                onSubmit={handleSubmit(onFormSubmit)}
            >
                <label
                    className="profile-item"
                >
                    Username:
                    <input
                        type="text"
                        className="input-bar login-detail"
                        placeholder={userName}
                        {...register("username", ) }
                        disabled
                    />
                </label>
                {errors.username && <h4 className="error-message">{errors.username.message}</h4>}

                <label
                    className="profile-item"
                >
                    Password:
                    <input
                        type="password"
                        className="input-bar login-detail"
                        placeholder="********"
                        {...register("password", {
                            minLength: {
                                value: 6,
                                message: "Password should have at least 6 characters"
                            },
                        })}
                    />
                </label>
                {errors.password && <h4 className="error-message">{errors.password.message}</h4>}

                <label
                    className="profile-item"
                >
                    Confirm password:
                    <input
                        type="password"
                        className="input-bar login-detail"
                        placeholder="********"
                        {...register("confirmPassword", {
                            validate: (value: string) => {
                                if (watch('password') !== value) {
                                    return "Your passwords do not match";
                                }
                            }
                        })}
                    />
                </label>
                {errors.confirmPassword && <h4 className="error-message">{errors.confirmPassword.message}</h4>}

                <label
                    className="profile-item"
                >
                    E-mail address:
                    <input
                        type="email"
                        className="input-bar login-detail"
                        placeholder={userEmail}
                        {...register("email", {
                        })}
                    />
                </label>
                {errors.email && <h4 className="error-message">{errors.email.message}</h4>}

                <label
                    className="profile-item"
                >
                    Home Country
                    <select
                        className="input-bar login-detail"
                        {...register("country", {value: userCountry})}
                    >
                        <option value="">Select</option>
                        <option value="ar">Argentina</option>
                        <option value="au">Australia</option>
                        <option value="at">Austria</option>
                        <option value="be">Belgium</option>
                        <option value="br">Brazil</option>
                        <option value="bg">Bulgaria</option>
                        <option value="ca">Canada</option>
                        <option value="cn">China</option>
                        <option value="co">Colombia</option>
                        <option value="cu">Cuba</option>
                        <option value="cz">Czechia</option>
                        <option value="eg">Egypt</option>
                        <option value="fr">France</option>
                        <option value="de">Germany</option>
                        <option value="gr">Greece</option>
                        <option value="hk">Hong Kong</option>
                        <option value="hu">Hungary</option>
                        <option value="in">India</option>
                        <option value="id">Indonesia</option>
                        <option value="ie">Ireland</option>
                        <option value="il">Israel</option>
                        <option value="it">Italy</option>
                        <option value="jp">Japan</option>
                        <option value="kr">Korea</option>
                        <option value="lv">Latvia</option>
                        <option value="lt">Lithuania</option>
                        <option value="my">Malaysia</option>
                        <option value="mx">Mexico</option>
                        <option value="ma">Morocco</option>
                        <option value="nl">Netherlands, the</option>
                        <option value="nz">New Zealand</option>
                        <option value="ng">Nigeria</option>
                        <option value="no">Norway</option>
                        <option value="ph">Philippines, the</option>
                        <option value="pl">Poland</option>
                        <option value="pt">Portugal</option>
                        <option value="ro">Romania</option>
                        <option value="ru">Russian Federation, the</option>
                        <option value="sa">Saudi Arabia</option>
                        <option value="rs">Serbia</option>
                        <option value="sg">Singapore</option>
                        <option value="sk">Slovakia</option>
                        <option value="si">Slovenia</option>
                        <option value="za">South Africa</option>
                        <option value="se">Sweden</option>
                        <option value="ch">Switzerland</option>
                        <option value="tw">Taiwan</option>
                        <option value="th">Thailand</option>
                        <option value="tr">Türkiye</option>
                        <option value="ua">Ukraine</option>
                        <option value="ae">United Arab Emirates</option>
                        <option value="gb">United Kingdom</option>
                        <option value="us">United States of America, the</option>
                        <option value="ve">Venezuela</option>
                    </select>
                </label>

                <p
                    id="country-info"
                >
                    By selecting a home country, the news on your homepage will be from that country
                </p>

                <div
                    className="button-container"
                >
                    <button
                        type="submit"
                        id="update-button"
                    >
                        Save settings
                    </button>
                </div>
            </form>
        </>
    );
}

export default Profilepage;