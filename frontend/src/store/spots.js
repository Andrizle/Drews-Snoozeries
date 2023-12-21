import { csrfFetch } from "./csrf"

const LOAD_SPOTS = 'spots/getSpots'
const LOAD_SPOT = 'spots/getSpot'
const ADD_SPOT = 'spots/addSpot'
const ADD_IMAGE = 'spots/addImage'
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

function addSpot(spot) {
    return{
        type: ADD_SPOT,
        spot
    }
}

function addImage(image, spotId) {
    return {
        type: ADD_IMAGE,
        image, spotId
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

export const createSpot = (spot, imageArr) => async dispatch => {
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: { "Content-Type": 'application/json'},
        body: JSON.stringify(spot)
    })

    if (response.ok) {
        const spot = await response.json()
        console.log('in returned spot response', imageArr, spot)
        if (spot) {
            for (let image of imageArr) {
            if (image)
            dispatch(createImage(image, spot.id));
            }
            dispatch(addSpot(spot))

            return spot
        }

    }

}

export const createImage = (image, spotId) => async dispatch => {
        const response = await csrfFetch(`/api/spots/${spotId}/images`, {
            method: 'POST',
            headers: { "Content-Type": 'application/json'},
            body: JSON.stringify(image)
        })

        if (response.ok) {
            const dataImg = await response.json()
            dispatch(addImage(dataImg, spotId))

            return dataImg
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
        case ADD_SPOT: {
            if (!state[action.spot.id]) {
                const newState = {
                ...state, [action.spot.id]: action.spot
                }
                return newState
            }
            return {
                ...state,
                [action.spot.id]: {
                    ...state[action.spot.id],
                    ...action.spot
                }
            }
        }
        case ADD_IMAGE: {
            if (!state[action.spotId]["Images"]) {
                const newState = {
                    ...state,
                    [state[action.spotId]]: {
                       ...state[action.spotId],
                       Images: {
                        [action.image.id]: action.image
                       }
                    }
                }
                return newState
            }
            return {
                ...state,
                [state[action.spotId]]: {
                   ...state[action.spotId],
                   [state[action.spotId].Images]: {
                        ...state[action.spotId].Images,
                        [action.image.id]: action.image
                   }
                }
            }
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
