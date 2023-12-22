import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSpot } from "../../store/spots";
import SpotReviews from "../SpotReviews/SpotReviews";
import './SingleSpot.css';
import OpenModalButton from "../OpenModalButton";
import PostReviewModal from "../PostReviewModal/PostReviewModal";

export default function SingleSpot() {
    const dispatch = useDispatch();
    const { spotId } = useParams();
    const [dispatched, setDispatched] = useState(false)
    const sessionUser = useSelector(state => state.session.user)
    const spot = useSelector(state => state.spots[spotId])
    // console.log(spot)

    useEffect(() => {
            dispatch(fetchSpot(spotId))
        }, [dispatch, spotId, dispatched])

    if (!spot || !spot.SpotImages) return null;
    const spotImages = []
    for (let i = 1; i < 5; i++) {
        let spotImage = spot.SpotImages[i]

        spotImage ?
        spotImages.push(spotImage):
        null;
    }

    return (
        <div>
            <h1>{spot.name}</h1>
            <h2>{spot.city} {spot.state}, {spot.country}</h2>
            <div className="imgContainer">
                <div id='bigSpotImgContainer'>
                    <img id='bigSpotImg' src={spot.SpotImages[0]?.url} alt="large image of spot from spotId" />
                </div>
                <div className="spotImageGrid">{spotImages.map(image => (
                    image.url ?
                    (<div className="smallImageDiv" key={image.id}><img className="smallImages" src={image.url} alt="image of spot from spotId" /></div>) :
                    <div key=''></div>
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

                            {spot.avgRating ?
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
                { spot.avgRating ?
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
                        {
                            sessionUser?.id !== spot.Owner.id ?
                            <OpenModalButton
                                buttonText='Post Your Review'
                                modalComponent={<PostReviewModal
                                                    spot={spot}
                                                    setDispatched={setDispatched}
                                                />}
                            /> :
                            null
                        }

                        <SpotReviews dispatched={dispatched} setDispatched={setDispatched}/>
                    </>) :
                    (<>
                        <h2>
                            <i className="fas fa-star"></i>
                            <span className="avgRating">New</span>
                        </h2>
                        {
                            sessionUser?.id !== spot.Owner.id ?
                            <h3>Be the first to post a review!</h3> :
                            null
                        }
                    </>)
                }
            </div>
        </div>
    )

}
