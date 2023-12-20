import { csrfFetch } from "./csrf"

const LOAD_REVIEWS = 'reviews/getReviews'

//action creators
function getReviews(reviews) {
    return {
        type: LOAD_REVIEWS,
        reviews
    }
}

//thunk action creators
export const fetchReviews = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`);

    if (response.ok) {
        const reviews = await response.json();
        console.log(reviews)

        dispatch(getReviews(reviews));

        return reviews
    }
}

//reviews reducer
const initialState = {};

const reviewReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_REVIEWS: {
            const newState = {}

            for (let review of action.reviews.Reviews) {
                newState[review.id] = review
            }

            return newState
        }
        default:
            return state
    }
}

export default reviewReducer
