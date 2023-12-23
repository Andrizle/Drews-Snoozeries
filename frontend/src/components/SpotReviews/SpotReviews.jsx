import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchReviews } from "../../store/reviews";
import './SpotReviews.css'
import OpenModalButton from "../OpenModalButton";
import DeleteReviewModal from "../DeleteReviewModal/DeleteReviewModal";

export default function SpotReviews() {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const sessionUser = useSelector(state => state.session.user)
    const reviews = Object.values(useSelector(state => state.reviews.spot))

    function compareNumbers(a, b) {
        return b.id - a.id;
    }

    useEffect(() => {
            dispatch(fetchReviews(spotId))
        }, [dispatch, spotId])

    if (!reviews) return null;

    const year = (date) => {
        const newDate = new Date(date)

        return newDate.getFullYear();
    }

    const month = date => {
        const newDate = Date(date)
        const dateArr = newDate.split(' ')

        return dateArr[1]
    }

    return (
        <div className="reviewsContainer">
            {reviews.sort(compareNumbers).map(review => (
                <div className="reviewDetails" key={review.id}>
                    <h3 className="reviewer">{review.User?.firstName}</h3>
                    <div className="reviewDate">{month(review.createdAt)} {year(review.createdAt)}</div>
                    <div className="reviewText">{review.review}</div>
                    {sessionUser?.id == review.userId ?
                        <OpenModalButton
                            buttonText='Delete'
                            modalComponent={<DeleteReviewModal review={review} />}
                        /> :
                        null
                    }
                </div>
            ))}

        </div>
    )
}
