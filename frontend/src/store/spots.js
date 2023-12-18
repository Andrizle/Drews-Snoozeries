import { csrfFetch } from "./csrf"

const LOAD_SPOTS = 'spots/getSpots'

//action creators
function getSpots(spots) {
    return {
        type: LOAD_SPOTS,
        spots
    }
}

//thunk action creators
export const fetchSpots = () => async dispatch => {
    const response = await csrfFetch('/api/spots')


    if (response.ok) {
        const spots = await response.json();
        dispatch(getSpots(spots));

        return spots
    }
}

//reducer
const initialState = {};

const spotReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_SPOTS: {
            const newState= {...state}

            for (let spot of action.spots.Spots) {
                newState[spot.id] = spot
            }

            return newState
        }
        default:
            return state
    }
}

export default spotReducer
