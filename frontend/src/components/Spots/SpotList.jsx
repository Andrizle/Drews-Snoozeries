import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpots } from '../../store/spots';
import { Link } from 'react-router-dom';
import './SpotList.css'

const SpotsList = () => {
    const dispatch = useDispatch();
    let spots = Object.values(useSelector(state => state.spots))

    useEffect(() => {
        dispatch(fetchSpots());
    }, [dispatch])

    return(
        <div>
            <h1>Spots List</h1>
            <div className='spotContainer'>
                {spots.map(spot => (
                <div className='spots tooltip' key={spot.id}>
                        <Link to={`/spots/${spot.id}`} className='spotTile' key={spot.id}>
                            <div className='spotPreview'>
                                <img className='spotPreviewImg' src={spot.previewImage} alt="pic of spot" />
                            </div>
                            <span className='tooltip-text'>{spot.name}</span>
                            <div className='cityRatings'>
                                <span className='cityState'>{spot.city}, {spot.state}</span>
                                {(spot.avgRating) ?
                                (<span><i className='fas fa-star'></i>{parseFloat(spot.avgRating).toFixed(1)}</span>) :
                                (<span><i className="fas fa-star"></i>New</span>)
                                }
                            </div>
                            {Number.isInteger(spot.price) ?
                            <p>${spot.price} night</p> :
                            <p>${parseFloat(spot.price).toFixed(2)} night</p>
                            }
                        </Link>
                </div>

                ))}
            </div>
        </div>
    )
}

export default SpotsList;
