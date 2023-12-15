import { csrfFetch } from "./csrf"

const LOGIN = 'session/login'

const LOGOUT = 'session/logout'

function login(user) {
    return {
        type: LOGIN,
        user
    }
}

const logout = () => ({
    type: LOGOUT
})

export const signupUser = user => async dispatch => {
    const {email, username, password, firstName, lastName } = user;
    const response = await csrfFetch('/api/users', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            email, username, password, firstName, lastName
        })
    });

    if (response.ok) {
        const data = await response.json();

        dispatch(login(data.user));

        return data.user
    }

}

export const userLogin = user => async dispatch => {
    const {credential, password} = user
    const response = await csrfFetch('/api/session', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            credential,
            password
        })
    });

    if (response.ok) {
        const data = await response.json();

        dispatch(login(data.user))

        return response
    }
}

export const userLogout = () => async dispatch => {
    const response = await csrfFetch('/api/session', {
        method: 'DELETE'
    })

    if (response.ok) {
        const message = await response.json();

        dispatch(logout());

        return message
    }
}

export const restoreUser = () => async (dispatch) => {
    const response = await csrfFetch("/api/session");
    const data = await response.json();
    dispatch(login(data.user));
    return response;
  };

const initialState = {user:null}

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN: {
            const currentUser = {...state, user: action.user}

            return currentUser
        }
        case LOGOUT: {
            const logout = {...state, user:null}
            return logout
        }
        default:
            return state
    }
}

export default userReducer
