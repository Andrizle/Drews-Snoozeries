import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSpot } from "../../store/spots";
import './SingleSpot.css';

export default function SingleSpot() {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const spot = useSelector(state => state.spots[spotId])
    console.log(spot)

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
                    image.url ?
                    (<div key={image.id}><img src={image.url} alt="image of spot from spotId" /></div>) :
                    <div>no image here</div>
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
                            <i className="fas fa-star"></i>
                            <span className="avgRating">{spot.avgRating}</span>
                            <span className="dotDivider"> . </span>
                            <span>{spot.numReviews} reviews</span>
                        </div>
                    </div>
                    <button id="reserveButton" onClick={() => {
                        throw alert("Feature coming soon")
                    }}>Reserve</button>
                </div>

            </div>
        </div>
    )

}
