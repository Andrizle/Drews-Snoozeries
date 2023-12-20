import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSpot } from "../../store/spots";
import SpotReviews from "../SpotReviews/SpotReviews";
import './SingleSpot.css';

export default function SingleSpot() {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const spot = useSelector(state => state.spots[spotId])
    // console.log(spot)

    useEffect(() => {
            dispatch(fetchSpot(spotId))
        }, [dispatch, spotId])


    if (!spot || !spot.SpotImages) return null;
    const spotImages = []
    for (let i = 1; i < 5; i++) {
        let spotImage = spot.SpotImages[i]

        spotImage ?
         spotImages.push(spotImage):
        spotImages.push('something');
    }

    return (
        <div>
            <h1>{spot.name}</h1>
            <h2>{spot.city} {spot.state}, {spot.country}</h2>
            <div className="imgContainer">
                <div id='bigSpotImg'>
                    <img src={spot.SpotImages[0]} alt="large image of spot from spotId" />
                </div>
                <div className="spotImageGrid">{spotImages.map(image => (
                    image ?
                    (<div key={image.id}><img src={image.url} alt="image of spot from spotId" /></div>) :
                    null
                ))}
                </div>
            </div>
            <div id="spotTextContainer">
                <div className="spotDescription">
                    <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
                    <p>{spot.description}</p>
                </div>
                <div className="reservationContainer">
                    <div className="priceReviews">
                        <span ><h2 className="price">${spot.price}</h2>night</span>
                        <div className="ratings">

                            { typeof spot.avgRating !== 'string' ?
                                (<>
                                    <i className="fas fa-star"></i>
                                    <span className="avgRating">{spot.avgRating}</span>
                                    <span className="dotDivider"> . </span>
                                    <span>{spot.numReviews}
                                    {spot.numReviews === 1 ?
                                        ' Review' :
                                        ' Reviews'
                                    }</span>
                                </>) :
                                (<span><i className="fas fa-star"></i>New</span>)
                            }

                        </div>
                    </div>
                    <button className="bigButton" onClick={() => {
                        throw alert("Feature coming soon")
                    }}>Reserve</button>
                </div>
            </div>
            <div className="spotReviews">
                { typeof spot.avgRating !== 'string' ?
                    (<>
                        <h2>
                            <i className="fas fa-star"></i>
                            <span className="avgRating">{spot.avgRating}</span>
                            <span className="dotDivider"> . </span>
                            <span>{spot.numReviews}
                            {spot.numReviews === 1 ?
                                ' Review' :
                                ' Reviews'
                            }</span>
                        </h2>
                        <SpotReviews />
                    </>) :
                    (<span>Be the first to post a review!</span>)
                }
            </div>
        </div>
    )

}
