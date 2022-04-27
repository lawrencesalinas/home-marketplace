import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css/bundle';
import { getDoc, doc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { db } from '../firebase.config'
import Spinner from '../components/Spinner'
import shareIcon from '../assets/svg/shareIcon.svg'
import formatMoney from '../utils/formatMoney'
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])

//--------------------------------------------------------------Listing Details page--------------------------------------------------------------//

function Listing() {
  const [listing, setListing] = useState(null)
  const [loading, setLoading] = useState(true)
  const [shareLinkCopied, setShareLinkCopied] = useState(false)

  const navigate = useNavigate()
  const params = useParams()
  const auth = getAuth()


  //-----------Fetch lisitng using the urlparams and userId-----------//
  useEffect(() => {
    const fetchListing = async () => {

      const docRef = doc(db, 'listings', params.listingId)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        console.log(docSnap.data());
        setListing(docSnap.data())
        setLoading(false)
      }
    }
    fetchListing()
  }, [navigate, params.listingId])

  if (loading) {
    return <Spinner />
  }
  // ---------------------------------------------------------------//


  return (
    <main>
      {/*------------------- Listing Images using Swiper----------------------- */}
      <Swiper slidesPerView={1} pagination={{ clickable: true }} style={{height:'300px'}}>
        {listing.imageUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div 
            style={{
              background: `url(${listing.imageUrls[index]}) 
            center no-repeat`,
              backgroundSize: 'cover',
            }}
              className="swiperSlideDiv"></div>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* --------------------------------------------------------------------- */}


      {/* ---------copy the url to the clipboard to share link-------------- */}
      <div className="shareIconDiv" onClick={() => {
        navigator.clipboard.writeText(window.location.href)
        setShareLinkCopied(true)
        setTimeout(() => {
          setShareLinkCopied(false)
        }, 2000)
      }}>
        <img src={shareIcon} alt="shareIcon" />
      </div>
      {shareLinkCopied && <p className="linkCopied">Link Copied</p>}
      {/*---------------------------------------------------------------------*/}


      {/*---------------------------- Listing details-------------------------------- */}
      <div className="listingDetails">
        <p className="listingName">
          {listing.name} - {listing.offer ? formatMoney(listing.discountedPrice) : formatMoney(listing.regularPrice)}
        </p>
        <p className="listingLocation">{listing.location}</p>
        <p className="listingType">
          For {listing.type === 'rent' ? 'Rent' : 'Sale'}
        </p>
        {/* iff there's an offer on the lsiting show the discount amount */}
        {listing.offer && (
          <p className="discountPrice">
            ${listing.regularPrice - listing.discountedPrice} discount
          </p>
        )}
        <ul className="listingDetailsList">
          <li>
            {listing.bedrooms > 1 ? `${listing.bedrooms} Bedrooms` : '1 Bedroom'}
          </li>
          <li>
            {listing.bathrooms > 1 ? `${listing.bathrooms} Bathrooms` : '1 Bathroom'}
          </li>
          <li>{listing.parking && 'Parking Spot'}</li>
          <li>{listing.furnished && 'Furnished'}</li>
        </ul>
        {/*-----------------------------------------------------------------------------*/}


        {/*--------------------- Lisitng address and Map interface using Leaflet ---------------------*/}
        <p className="listingLocationTitle">
          Location
        </p>
        <div className="leafletContainer">
          <MapContainer style={{ height: '100%', width: '100%' }} center={[listing.geolocation.lat, listing.geolocation.lng]} zoom={13} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[listing.geolocation.lat, listing.geolocation.lng]}>
              <Popup>{listing.location}</Popup>
            </Marker>
          </MapContainer>
        </div>
        {/*--------------------------------------------------------------------------------------------*/}


        {/*------------- show contact the landlord button if the user is not the owner of the listing--- */}
        {auth.currentUser?.uid !== listing.userRef && (
          <Link to={`/contact/${listing.userRef}?listingName=${listing.name}`} className='primaryButton'>
            Contact Landlord
          </Link>
        )}
        {/*----------------------------------------------------------------------------------------------*/}

      </div>
    </main>
  )
}

export default Listing