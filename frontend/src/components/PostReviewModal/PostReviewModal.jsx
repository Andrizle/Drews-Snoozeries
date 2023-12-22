import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { postReview } from '../../store/reviews';
import { useState } from 'react';
import RatingInput from './RatingInput';
import './PostReviewModal.css';

export default function PostReviewModal({spot, setDispatched}) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    const [review, setReview] = useState('');
    const [stars, setStars] = useState('');

    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState({})

    const updateReview = e => setReview(e.target.value)

    const handleSubmit = async e => {
        e.preventDefault();

        const newReview = {
            review,
            stars
        }

        await dispatch(postReview(newReview, spot.id))
        .then(setDispatched(true))
        .then(closeModal)
        .catch(async (res) => {
            const data = await res.json();
            if (data?.errors) {
              setErrors(data.errors);
            } else if (data?.message) {
                setMessage(data)
            }
          });


    }

    const onChange = (num) => {
        setStars(parseInt(num));
      };

    return (
        <div id='reviewModal'>
            <h1 id='reviewHeader'>How was your stay?</h1>
            <div id='reviewModalContent'>
                <form onSubmit={handleSubmit}>
            {message.message && <p className='errors'>{message.message}</p> }
                        <textarea
                            id='reviewModalText'
                            placeholder='Leave your review here...'
                            type="text"
                            value={review}
                            onChange={updateReview}
                        />
                        {errors.review && <p className='errors'>{errors.review}</p> }
                    <div id='starsContainer'>
                        <RatingInput
                            onChange={onChange}
                            stars={stars}
                        /> <span>Stars</span>
                    </div>
                        {errors.review && <p className='errors'>{errors.review}</p> }
                    <button
                        type='submit'
                        className='bigButton' id='submitReviewButton'
                    >
                        Submit Your Review</button>
                </form>
            </div>


        </div>
    )
}
