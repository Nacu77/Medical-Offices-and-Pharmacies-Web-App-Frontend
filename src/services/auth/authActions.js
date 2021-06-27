import axios from "../../axios";

import { LOGIN_REQUEST, LOGOUT_REQUEST, SUCCESS, FAILURE } from "./authTypes";
import authToken from "../utils/authToken";

export const authenticateUser = (username, password) => {
    const credentials = {
        username: username,
        password: password,
    };

    return (dispatch) => {
        dispatch(loginRequest());
        axios
            .post("/users/login", credentials)
            .then((res) => {
                const token = res.data.token;
                localStorage.setItem("jwtToken", token);
                authToken(token);

                const role = res.data.role;
                axios
                    .get(`/users/${res.data.userId}`)
                    .then((res) => {
                        dispatch(success(true, res.data, role));
                    })
                    .catch((err) => {
                        console.log(err);
                        dispatch(failure());
                    });
            })
            .catch((err) => {
                console.log(err);
                dispatch(failure());
            });
    };
};

export const logoutUser = () => {
    return (dispatch) => {
        dispatch(logoutRequest());
        localStorage.removeItem("jwtToken");
        authToken();
        dispatch(success(false, { patient: {} }, undefined));
    };
};

const loginRequest = () => ({
    type: LOGIN_REQUEST,
});

const logoutRequest = () => ({
    type: LOGOUT_REQUEST,
});

const success = (isLoggedIn, user, role) => ({
    type: SUCCESS,
    payload: {
        isLoggedIn: isLoggedIn,
        user: user,
        role: role,
    },
});

const failure = () => ({
    type: FAILURE,
    payload: {
        isLoggedIn: false,
        user: { patient: {} },
        role: undefined,
    },
});
