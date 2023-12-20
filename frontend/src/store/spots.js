import { csrfFetch } from "./csrf"

const LOAD_SPOTS = 'spots/getSpots'
const LOAD_SPOT = 'spots/getSpot'
const DELETE_SPOT = 'spots/deleteSpot'


//action creators
function getSpots(spots) {
    return {
        type: LOAD_SPOTS,
        spots
    }
}

function getSpot(spot) {
    return {
        type: LOAD_SPOT,
        spot
    }
}

function deleteSpot(spotId) {
    return{
        type: DELETE_SPOT,
        spotId
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

export const fetchSpot = spotId => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`)

    if (response.ok) {
        const spot = await response.json()
        dispatch(getSpot(spot))

        return spot
    }
}

export const seekAndDestroySpot = spot => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spot.id}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        dispatch(deleteSpot(spot.id))
        return spot.id
    }
}

//spot's reducer
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
        case LOAD_SPOT: {
            const newState = {[action.spot.id]: action.spot}
            return newState
        }
        case DELETE_SPOT: {
            const newState = {...state}
            delete newState[action.spotId]
            return newState
        }
        default:
            return state
    }
}

export default spotReducer
