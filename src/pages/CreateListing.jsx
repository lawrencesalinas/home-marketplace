import { useState, useEffect, useRef } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'
import { toast } from 'react-toastify'


function CreateListing() {
    const [loading, setLoading] = useState(false)
    const [geolocationEnabled, setGeoLocationEnabled] = useState(true)
    const [formData, setFormData] = useState({
        type: 'rent',
        name: '',
        bedrooms: 1,
        bathrooms: 1,
        parking: false,
        furnished: false,
        address: '',
        offer: false,
        regularPrice: 0,
        discountedPrice: 0,
        images: {},
        latitude: 0,
        longitude: 0
    })

    const { type, name, bedrooms, bathrooms, parking, furnished, address, offer, regularPrice, discountedPrice, images, latitude, longitude } = formData

    const auth = getAuth()
    const navigate = useNavigate()
    const isMounted = useRef(true)

    useEffect(() => {
        if (isMounted) {
            // check for the user then setformdata on the current form data and set userRef to reference user
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    setFormData({ ...formData, userRef: user.uid })
                } else {
                    navigate('/sign-in')
                }
            })
        }
        return () => {
            isMounted.current = false
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted])

    const onSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        // check if discounted price is greater than regular price
        if (discountedPrice >= regularPrice) {
            setLoading(false)
            toast.error('Dscounted price needs to be less than regular price')
            return
        }

        // check if there are more than 6 images being uploaded
        if (images.length > 6) {
            setLoading(false)
            toast.error('Max 6 images')
        }

        let geolocation = {}
        let location

        // check if geolocation is enbaled or manual
        if (geolocationEnabled) {
            const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.REACT_APP_GEOCODE_API_KEY}`)
            const data = await response.json()

            // set latitude and longitude from the response from the api
            geolocation.lat = data.results[0]?.geometry.location.lat ?? 0
            geolocation.lng = data.results[0]?.geometry.location.lng ?? 0


            // if search result does not exist, set location as undefined
            location = data.status === 'ZERO RESULTS' ? undefined :
                data.results[0]?.formatted_address

            if (location === undefined || location.includes('undefined')){
                setLoading(false)
                toast.error('Please enter a correct address')
            }


        } else {
            geolocation.lat = latitude
            geolocation.lng = longitude
            location = address
        }
        setLoading(false)

    }

    const onMutate = (e) => {
        let boolean = null
        if (e.target.value === 'true') {
            boolean = true
        }
        if (e.target.value === 'false') {
            boolean = false
        }
        // files
        if (e.target.files) {
            setFormData((prevState) => ({
                ...prevState,
                images: e.target.files
            }
            ))
        }

        // Text/Booleans/Numbers
        if (!e.target.files) {
            setFormData((prevState) => ({
                ...prevState,
                // e.target.id uses the id in the input form and if its a not a boolean it will be a text field?
                [e.target.id]: boolean ?? e.target.value
            }))
        }

    }

    if (loading) {
        return <Spinner />
    }
    return (
        <div className='profile'>
            <header>
                <p className='pageHeader'>Create a Listing</p>
            </header>

            <main>
                <form onSubmit={onSubmit}>
                    <label className='formLabel'>Sell / Rent</label>
                    <div className='formButtons'>
                        <button
                            type='button'
                            className={type === 'sale' ? 'formButtonActive' : 'formButton'}
                            id='type'
                            value='sale'
                            onClick={onMutate}
                        >
                            Sell
                        </button>
                        <button
                            type='button'
                            className={type === 'rent' ? 'formButtonActive' : 'formButton'}
                            id='type'
                            value='rent'
                            onClick={onMutate}
                        >
                            Rent
                        </button>
                    </div>

                    <label className='formLabel'>Name</label>
                    <input
                        className='formInputName'
                        type='text'
                        id='name'
                        value={name}
                        onChange={onMutate}
                        maxLength='32'
                        minLength='10'
                        required
                    />

                    <div className='formRooms flex'>
                        <div>
                            <label className='formLabel'>Bedrooms</label>
                            <input
                                className='formInputSmall'
                                type='number'
                                id='bedrooms'
                                value={bedrooms}
                                onChange={onMutate}
                                min='1'
                                max='50'
                                required
                            />
                        </div>
                        <div>
                            <label className='formLabel'>Bathrooms</label>
                            <input
                                className='formInputSmall'
                                type='number'
                                id='bathrooms'
                                value={bathrooms}
                                onChange={onMutate}
                                min='1'
                                max='50'
                                required
                            />
                        </div>
                    </div>

                    <label className='formLabel'>Parking spot</label>
                    <div className='formButtons'>
                        <button
                            className={parking ? 'formButtonActive' : 'formButton'}
                            type='button'
                            id='parking'
                            value={true}
                            onClick={onMutate}
                            min='1'
                            max='50'
                        >
                            Yes
                        </button>
                        <button
                            className={
                                !parking && parking !== null ? 'formButtonActive' : 'formButton'
                            }
                            type='button'
                            id='parking'
                            value={false}
                            onClick={onMutate}
                        >
                            No
                        </button>
                    </div>

                    <label className='formLabel'>Furnished</label>
                    <div className='formButtons'>
                        <button
                            className={furnished ? 'formButtonActive' : 'formButton'}
                            type='button'
                            id='furnished'
                            value={true}
                            onClick={onMutate}
                        >
                            Yes
                        </button>
                        <button
                            className={
                                !furnished && furnished !== null
                                    ? 'formButtonActive'
                                    : 'formButton'
                            }
                            type='button'
                            id='furnished'
                            value={false}
                            onClick={onMutate}
                        >
                            No
                        </button>
                    </div>

                    <label className='formLabel'>Address</label>
                    <textarea
                        className='formInputAddress'
                        type='text'
                        id='address'
                        value={address}
                        onChange={onMutate}
                        required
                    />

                    {!geolocationEnabled && (
                        <div className='formLatLng flex'>
                            <div>
                                <label className='formLabel'>Latitude</label>
                                <input
                                    className='formInputSmall'
                                    type='number'
                                    id='latitude'
                                    value={latitude}
                                    onChange={onMutate}
                                    required
                                />
                            </div>
                            <div>
                                <label className='formLabel'>Longitude</label>
                                <input
                                    className='formInputSmall'
                                    type='number'
                                    id='longitude'
                                    value={longitude}
                                    onChange={onMutate}
                                    required
                                />
                            </div>
                        </div>
                    )}

                    <label className='formLabel'>Offer</label>
                    <div className='formButtons'>
                        <button
                            className={offer ? 'formButtonActive' : 'formButton'}
                            type='button'
                            id='offer'
                            value={true}
                            onClick={onMutate}
                        >
                            Yes
                        </button>
                        <button
                            className={
                                !offer && offer !== null ? 'formButtonActive' : 'formButton'
                            }
                            type='button'
                            id='offer'
                            value={false}
                            onClick={onMutate}
                        >
                            No
                        </button>
                    </div>

                    <label className='formLabel'>Regular Price</label>
                    <div className='formPriceDiv'>
                        <input
                            className='formInputSmall'
                            type='number'
                            id='regularPrice'
                            value={regularPrice}
                            onChange={onMutate}
                            min='50'
                            max='750000000'
                            required
                        />
                        {type === 'rent' && <p className='formPriceText'>$ / Month</p>}
                    </div>

                    {offer && (
                        <>
                            <label className='formLabel'>Discounted Price</label>
                            <input
                                className='formInputSmall'
                                type='number'
                                id='discountedPrice'
                                value={discountedPrice}
                                onChange={onMutate}
                                min='50'
                                max='750000000'
                                required={offer}
                            />
                        </>
                    )}

                    <label className='formLabel'>Images</label>
                    <p className='imagesInfo'>
                        The first image will be the cover (max 6).
                    </p>
                    <input
                        className='formInputFile'
                        type='file'
                        id='images'
                        onChange={onMutate}
                        max='6'
                        accept='.jpg,.png,.jpeg'
                        multiple
                        required
                    />
                    <button type='submit' className='primaryButton createListingButton'>
                        Create Listing
                    </button>
                </form>
            </main>
        </div>
    )
}


export default CreateListing