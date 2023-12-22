import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createSpot } from '../../store/spots';
import './CreateSpot.css'

export default function CreateSpot() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [spotImg1, setSpotImg1] = useState('');
    const [spotImg2, setSpotImg2] = useState('');
    const [spotImg3, setSpotImg3] = useState('');
    const [spotImg4, setSpotImg4] = useState('');

    const [errors, setErrors] = useState({});

    const updateCountry = e => setCountry(e.target.value);
    const updateAddress = e => setAddress(e.target.value);
    const updateCity = e => setCity(e.target.value);
    const updateState = e => setState(e.target.value);
    const updateDescription = e => setDescription(e.target.value);
    const updateName = e => setName(e.target.value);
    const updatePrice = e => setPrice(e.target.value);
    const updatePreviewImage = e => setPreviewImage(e.target.value)
    const updateSpotImg1 = e => setSpotImg1(e.target.value)
    const updateSpotImg2 = e => setSpotImg2(e.target.value)
    const updateSpotImg3 = e => setSpotImg3(e.target.value)
    const updateSpotImg4 = e => setSpotImg4(e.target.value)


    const handleSubmit = async (e) => {
        e.preventDefault();

        const createdSpot = {
            address,
            city,
            state,
            country,
            name,
            description,
            price
        }

        const imgArr = [
            {
                url: previewImage,
                preview: true
            },
            spotImg1 ?
            {
                url: spotImg1,
                preview: false
            } :
            null,
            spotImg2 ?
            {
                url: spotImg2,
                preview: false
            } :
            null,
            spotImg3 ?
            {
                url: spotImg3,
                preview: false
            } :
            null,
            spotImg4 ?
            {
                url: spotImg4,
                preview: false
            } :
            null
        ]



        const returnedSpot = await dispatch(createSpot(createdSpot, imgArr))
        .catch(async (res) => {
            const data = await res.json();
            if (data?.errors) {
              setErrors(data.errors);
            }
          });

          if (returnedSpot) {
            navigate(`/spots/${returnedSpot.id}`)
        }
    }


    return (
        <>
            <h1>Create a New Spot</h1>
            <div id='createPage'>
                <div id='createTextContainer'>
                    <h3 className='createHeaders'>Where&apos;s your place located?</h3>
                    <p className='createDescriptions'>Guests will only get your exact address once they booked a reservation</p>
                    <form onSubmit={handleSubmit}>
                        <label className='formInput'>
                            Country
                            <input
                                className='createInputs'
                                placeholder='Country'
                                type="text"
                                value={country}
                                onChange={updateCountry}
                                // required
                            />
                        </label>
                        {errors.country && <p className='errors'>{errors.country}</p>}
                        <label className='formInput'>
                            Street Address
                            <input
                                className='createInputs'
                                placeholder='Address'
                                type="text"
                                value={address}
                                onChange={updateAddress}
                                required
                            />
                        </label>
                        {errors.address && <p className='errors'>{errors.address}</p>}
                        <div id='cityState'>
                                <label
                                    id='cityContainer'
                                >
                                City
                                <input
                                    id='cityInput'
                                    placeholder='City'
                                    type="text"
                                    value={city}
                                    onChange={updateCity}
                                    required
                                />
                                </label>
                            <span id='cityStateComma'>, </span>
                                <label
                                    id='stateContainer'
                                >
                                State
                                <input
                                    id='stateInput'
                                    placeholder='State'
                                    type="text"
                                    value={state}
                                    onChange={updateState}
                                    required
                                />
                                </label>
                        </div>
                        {errors.city && <p className='errors'>{errors.city}</p>}
                        {errors.state && <p className='errors'>{errors.state}</p>}
                        <div className='createContainers'>
                            <h3 className='createHeaders'>Describe your place to guests</h3>
                            <p className='createDescriptions'>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.
                            </p>
                            <textarea
                                id='descriptionInput'
                                placeholder='Please write at least 30 characters'
                                type='text'
                                value={description}
                                onChange={updateDescription}
                            />
                            {errors.description && <p className='errors'>{errors.description}</p>}
                        </div>
                        <div id='titleInputContainer'>
                            <h3 className='createHeaders'>Create a title for your spot</h3>
                            <p className='createDescriptions'>Catch guests&apos; attention with a spot title that highlights what makes your place special.
                            </p>
                            <input
                                className='createInputs'
                                placeholder='Name of your spot'
                                type="text"
                                value={name}
                                onChange={updateName}
                            />
                            {errors.name && <p className='errors'>A title for your spot is required</p>}
                        </div>
                        <div className='createContainers'>
                            <h3 className='createHeaders'>Set a base price for your spot</h3>
                            <p className='createDescriptions'>Competitive pricing can help your listing stand out and rank higher in search results.
                            </p>
                            <label id="priceInputContainer">
                                $<input
                                className='createInputs'
                                id='priceInput'
                                placeholder='Price per night (USD)'
                                type="number"
                                value={price}
                                onChange={updatePrice}
                                />
                            </label>
                            {errors.price && <p className='errors'>{errors.price}</p>}
                        </div>
                        <div id='imageInputContainer'>
                            <h3 className='createHeaders'>Liven up your spot with photos</h3>
                            <p className='createDescriptions'>Submit a link to at least one photo to publish your spot
                            </p>
                            <input
                                className='createInputs'
                                placeholder='Preview Image URL'
                                type="URL"
                                id="previewImage"
                                value={previewImage}
                                onChange={updatePreviewImage}
                                required
                            />
                            <input
                                className='createInputs spotImages'
                                placeholder='Image URL'
                                type="URL"
                                value={spotImg1}
                                onChange={updateSpotImg1}
                            />
                            <input
                                className='createInputs spotImages'
                                placeholder='Image URL'
                                type="URL"
                                value={spotImg2}
                                onChange={updateSpotImg2}
                            />
                            <input
                                className='createInputs spotImages'
                                placeholder='Image URL'
                                type="URL"
                                value={spotImg3}
                                onChange={updateSpotImg3}
                            />
                            <input
                                className='createInputs spotImages'
                                placeholder='Image URL'
                                type="URL"
                                value={spotImg4}
                                onChange={updateSpotImg4}
                            />
                        </div>
                        <div>
                            <button type='submit'>Create Spot</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
