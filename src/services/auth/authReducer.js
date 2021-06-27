import { LOGIN_REQUEST, LOGOUT_REQUEST, SUCCESS, FAILURE } from "./authTypes";

const initialState = {
    isLoggedIn: false,
    user: { patient: {} },
    role: undefined,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case LOGOUT_REQUEST:
            return {
                ...state,
            };
        case SUCCESS:
        case FAILURE:
            return {
                isLoggedIn: action.payload.isLoggedIn,
                user: action.payload.user,
                role: action.payload.role,
            };
        default:
            return state;
    }
};

export default reducer;
