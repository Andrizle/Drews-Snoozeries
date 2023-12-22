import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { seekAndDestroyReview } from '../../store/reviews';


function DeleteReviewModal({review, setDispatched}) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleClick = (e) => {
    e.preventDefault();
    return dispatch(seekAndDestroyReview(review))
    .then(setDispatched(true))
    .then(closeModal);
  };

  return (
    <div id='deleteModal'>
      <h1 id='deleteHeader'>Confirm Delete</h1>
      <div className='deleteModalContent'>
        <p id='deleteConfirmText'>Are you sure you want to remove this spot from the listings?</p>
        <button className='bigButton' id='deleteButton'
        onClick={handleClick}
        >Yes (Delete Review)</button>
        <button
        className='bigButton' id='dontDeleteButton'
        onClick={closeModal}
        >No (Keep Review)</button>
      </div>

    </div>
  );
}

export default DeleteReviewModal;
