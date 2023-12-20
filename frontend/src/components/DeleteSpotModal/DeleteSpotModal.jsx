import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { seekAndDestroySpot } from '../../store/spots';
import './DeleteSpotModal.css'


function DeleteSpotModal({spot}) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleClick = (e) => {
    e.preventDefault();
    return dispatch(seekAndDestroySpot(spot))
      .then(closeModal);
  };

  return (
    <div id='deleteModal'>
      <h1 id='deleteHeader'>Confirm Delete</h1>
      <div className='deleteModalContent'>
        <p id='deleteConfirmText'>Are you sure you want to remove this spot from the listings?</p>
        <button className='bigButton' id='deleteButton'
        onClick={handleClick}
        >Yes (Delete Spot)</button>
        <button
        className='bigButton' id='dontDeleteButton'
        onClick={closeModal}
        >No (Keep Spot)</button>
      </div>

    </div>
  );
}

export default DeleteSpotModal;
