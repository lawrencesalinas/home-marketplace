import {useState, useEffect, useRef} from 'react'
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import {useNavigate} from 'react-router-dom'
import Spinner from '../components/Spinner'


function CreateListing() {
    const [geolocationEnabled, setGeoLocationEnabled] = useState(true)
    const [formData, setFormData] = useState({
        typr: 'rent',
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
        location: 0,
        longitude: 0
    })

    const auth = getAuth()
    const navigate = useNavigate()
    const isMounted = useRef(true)

    useEffect(()=> {
        if(isMounted){
            // check for the user then setformdata on the current form data and set userRef to reference user
            onAuthStateChanged(auth, (user) => {
                if(user) {
                    setFormData({...formData, userRef: user.uid})
                } else {
                    navigate('/sign-in')
                }
            })

        }

        return () => {
            isMounted.current =false
        }
           // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isMounted])

  return (
    <div>CreateListing</div>
  )
}

export default CreateListing