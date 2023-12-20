import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchReviews } from "../../store/reviews";
import './SpotReviews.css'

export default function SpotReviews() {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const reviews = Object.values(useSelector(state => state.reviews))

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
            {reviews.map(review => (
                <div className="reviewDetails" key={review.id}>
                    <h3 className="reviewer">{review.User.firstName}</h3>
                    <div className="reviewDate">{month(review.createdAt)} {year(review.createdAt)}</div>
                    <div className="reviewText">{review.review}</div>
                </div>
            ))}

        </div>
    )
}
