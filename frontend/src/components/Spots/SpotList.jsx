import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpots } from '../../store/spots';
import { Link } from 'react-router-dom';
import './SpotList.css'

const SpotsList = () => {
    const dispatch = useDispatch();
    const spots = Object.values(useSelector(state => state.spots))
    console.log(spots)

    useEffect(() => {
        dispatch(fetchSpots());
    }, [dispatch])

    return(
        <div>
            <h1>Spots List</h1>
            <div className='spotContainer'>
                {spots.map(spot => (
                <div className='spots' key={spot.id}>
                        <Link to={`/api/spots/${spot.id}`} key={spot.id}>
                            <img src={spot.previewImage} alt="pic of spot" />
                        </Link>
                        <div className='cityRatings'>
                            <span>{spot.city}, {spot.state}</span>
                            {(typeof spot.avgRating === "number") ?
                            (<span>{spot.avgRating}</span>) :
                            (<span>New</span>)
                            }
                        </div>
                            <p>{spot.price}/night</p>
                </div>

                ))}
            </div>
        </div>
    )
}

export default SpotsList;
