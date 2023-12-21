import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpots } from '../../store/spots';
import { Link, useNavigate } from 'react-router-dom';
import OpenModalButton from '../OpenModalButton';
import DeleteSpotModal from '../DeleteSpotModal/DeleteSpotModal';
import './CurrentUserSpots.css'

const CurrentUserSpots = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const spots = Object.values(useSelector(state => state.spots))
    const sessionUser = useSelector(state => state.session.user)
    const userSpots = [];

    spots.forEach(spot => {
        if ( spot.ownerId === sessionUser.id) userSpots.push(spot);
    })

    useEffect(() => {
        dispatch(fetchSpots())
    }, [dispatch])

    return(
        <div>
            <h1>Manage Your Spots</h1>

                <button id='addListing'
                onClick={() => navigate('/spots/new')}
                >Add New Listing</button>

            <div className='spotContainer'>
                {userSpots.map(spot => (
                <div className='spots tooltip' key={spot.id}>
                        <Link to={`/spots/${spot.id}`} className='spotTile' key={spot.id}>
                            <div className='spotPreview'>
                                <img className='spotPreviewImg' src={spot.previewImage} alt="pic of spot" />
                            </div>
                            <span className='tooltip-text'>{spot.name}</span>
                            <div className='cityRatings'>
                                <span>{spot.city}, {spot.state}</span>
                                {(spot.avgRating) ?
                                (<span><i className='fas fa-star'></i>{spot.avgRating}</span>) :
                                (<span><i className="fas fa-star"></i>New</span>)
                                }
                            </div>
                                <p>${spot.price} night</p>
                        </Link>
                        <div className='usersManageButtons'>
                            <button className='updateButton'
                            onClick={() => {throw alert('Feature coming soon')}}
                            >Update</button>
                            {/* <OpenModalButton
                            className='updateButton'
                            buttonText='Update'
                            />*/}
                            <OpenModalButton
                            buttonText='Delete'
                            modalComponent={<DeleteSpotModal spot={spot}/>}
                            />
                        </div>
                </div>
                ))}
            </div>

        </div>
    )
}

export default CurrentUserSpots;
