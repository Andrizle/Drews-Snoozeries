import { csrfFetch } from "./csrf"

const LOAD_REVIEWS = 'reviews/getReviews'
const ADD_REVIEW = 'reviews/addReview'
const DELETE_REVIEW = 'reviews/deleteReview'

//action creators
function getReviews(reviews) {
    return {
        type: LOAD_REVIEWS,
        reviews
    }
}

function addReview(review) {
    return {
        type: ADD_REVIEW,
        review
    }
}

function deleteReview(reviewId) {
    return{
        type: DELETE_REVIEW,
        reviewId
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

export const postReview = (review, spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(review)
    })

    if (response.ok) {
        const review = await response.json();

        dispatch(addReview(review))

        return review
    }

}

export const seekAndDestroyReview = (review) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${review.id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        dispatch(deleteReview(review.id))
        return review.id
    }
}

//reviews reducer
const initialState = {spot:{}, user: {}};

const reviewReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_REVIEWS: {
            const newSpotReviews = {};

            for (let review of action.reviews.Reviews) {
                newSpotReviews[review.id] = review
            }

            return {...state, spot: newSpotReviews}
        }
        case ADD_REVIEW: {
            const newSpotState = {...state.spot, [action.review.id]: action.review}

            return {...state, spot: newSpotState}
        }
        case DELETE_REVIEW: {
            const newState = {...state}
            delete newState.spot[action.reviewId]
            return newState
        }
        default:
            return state
    }
}

export default reviewReducer
